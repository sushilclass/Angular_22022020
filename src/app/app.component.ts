import { Component } from '@angular/core';
import { CustomerService } from './shared/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Parameter Pusher GUI';
}
