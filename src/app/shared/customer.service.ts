import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './customer';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { Action } from './action';

//This should be removed
//let IDTOKENTEST = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSJ9.eyJhdWQiOiI0YTFhYTFkNS1jNTY3LTQ5ZDAtYWQwYi1jZDk1N2E0N2Y4NDIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vN2I4ZjdhY2MtZTFjMC00NjdhLTg2ZTktNjc4MTQ0ZGE3ODgxL3YyLjAiLCJpYXQiOjE1ODE5Nzc0NjgsIm5iZiI6MTU4MTk3NzQ2OCwiZXhwIjoxNTgxOTgxMzY4LCJuYW1lIjoiSmFtZXMgTS4gRHJ1bW1vbmQiLCJvaWQiOiI0N2I2MzEyMi0zOWI2LTQ0NjYtYTRlYi04MzE1ZWQyNDYwOGEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJKYW1lcy5NLkRydW1tb25kQGltZWdjb3JwLmNvbSIsInN1YiI6IjBuWDNQYVFxZWxEZ21fUldBYXBFak5FYnN4UEdNOFlQNnhNSWllbXNiWHciLCJ0aWQiOiI3YjhmN2FjYy1lMWMwLTQ2N2EtODZlOS02NzgxNDRkYTc4ODEiLCJ1dGkiOiJucnFqX1RYUlQwLVJlMXBMaUZhbUFBIiwidmVyIjoiMi4wIn0.Mf5JpDG2Frcb-g0-J757NL_1Fxlu6FkrprnACDcUwVr3SBVkCXyL-WDtWiHfc7eLnXw7FnTReEoWHajVPkBlT_FNyAXJte0w4FgQZ2JyyEcAtRFS3Hl85TXCHU8P1L4m_SAxSJtjrsmB1831kbpreyX-pEN4fJ1AN5fDM9zwskPJZl06hKbZ4ntQ-E4nhzvBh3z-O7K_jWNOxj6X3rHJN35TpmI4EnU8S9wXOZNuKA2RWouRd3iOuZpW55HdPMDVd51r4UzHMv5VTl-Pxv6sk-J15XshT5tzFbGj254XPXH6uzAb4kWw1C024XLVWRCrRj7ieNpygK6djVkPPXh3tA';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private userAuthToken: string;
  _webSocket: WebSocketSubject<any>;

  constructor(private authService: AuthService) {
    this._webSocket = webSocket({ url: environment.WSHOST });
    if (this._webSocket) {
      this._webSocket.subscribe(
        msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
        err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        () => console.log('complete') // Called when connection is closed (for whatever reason).
      );
      console.log("Connected using Web Socket");
    }
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Error Handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // Get JSON data using websocket
  _SyncWithWsRevitElementData(token: string) {
    this.userAuthToken = token;
    if (this.userAuthToken != null) {
      var action: Action = new Action();
      action.Action = "getJsonAll";
      //Need to change with Id_Token returned from authenticator
      action.IdToken = this.userAuthToken;
      //action.ParentElementUniqueId;
      this._webSocket.next(action);
      return this._webSocket.asObservable();
    } else {
      //TODO need to redirect user to login page
    }
  }

  // Update Parameter by GUId or BUILTIN using WebSocket
  _UpdateRevitParameter(uniqueId, value, GUID, BUILTIN, DocumentHashCode, RevitWsSessionId): Observable<any> {
    if (this.userAuthToken != null) {
      var action: Action = new Action();
      action.Action = "setParameter";
      action.GUID = GUID;
      action.ParentElementUniqueId = uniqueId;
      action.Value = value;
      action.BUILTIN = BUILTIN;
      action.DocumentHashCode = DocumentHashCode;
      action.IdToken = this.userAuthToken;
      action.RevitWsSessionId = RevitWsSessionId;
      this._webSocket.next(action);
      return this._webSocket.asObservable();
    }
  }

}