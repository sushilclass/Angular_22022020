import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MsalModule } from '@azure/msal-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerService } from './shared/customer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { LoginAdComponent } from './components/login-ad/login-ad.component';

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import { OAuthSettings } from '../oauth';
import { AlertsComponent } from './alerts/alerts.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

// Add FontAwesome icons
library.add(faExternalLinkAlt);
library.add(faUserCircle);

const modules = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  BrowserAnimationsModule,
  MatTableModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatInputModule,
  MatDividerModule,
  MatToolbarModule,
  MatTabsModule,
  MatTreeModule,
  NgbModule,
  FontAwesomeModule,
  //https://www.npmjs.com/package/@azure/msal-angular
  MsalModule.forRoot({
    clientID: OAuthSettings.appId,
    cacheLocation: "localStorage", //default was session which we do not want to persist the token.
  })
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    LoginAdComponent,
    AlertsComponent,
    CalendarComponent,
    HomeComponent,
    NavBarComponent
  ],
  imports: [modules],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
