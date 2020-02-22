import { Component, OnInit } from '@angular/core';
import {environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-ad',
  templateUrl: './login-ad.component.html',
  styleUrls: ['./login-ad.component.css']
})
export class LoginAdComponent implements OnInit {
  userData;
  userAgentApplication;
 
 
  constructor() {
    environment.clientId;
   }

  ngOnInit() {
  }

  

  
}
