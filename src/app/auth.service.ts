import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as process from 'process';

import { AlertsService } from './alerts.service';
import { OAuthSettings } from '../oauth';
import { User } from './user';

let WSHOST = process.env.WSHOST || "ws://localhost:4000/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;
  public user: User;
  _webSocket: WebSocketSubject<any>;
  public token: any;
  private oAuthSettings = OAuthSettings;

  constructor(
    private msalService: MsalService,
    private alertsService: AlertsService) {

    this.authenticated = this.msalService.getUser() != null;

    if (this.authenticated) {
      this.getUser().then((user) => { this.user = user });
      this.getAccessToken().then((token) => { this.token=token });
    }

  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    let result = await this.msalService.loginPopup(this.oAuthSettings.scopes)
      .catch((reason) => {
        this.alertsService.add('Login failed', JSON.stringify(reason, null, 2));
      });
      
    if (result) {
      this.token = result;
      this.authenticated = true;
      this.user = await this.getUser();
      return result;
    }   
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(this.oAuthSettings.scopes)
      .catch((reason) => {
        this.alertsService.add('Get token failed', JSON.stringify(reason, null, 2));
      });

    return result;
  }

  private async getUser(): Promise<User> {

    let graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async (done) => {
        let token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token) {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    let graphUser = await graphClient.api('/me').get();

    let user = new User();
    user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;

    return user;
  }
}
