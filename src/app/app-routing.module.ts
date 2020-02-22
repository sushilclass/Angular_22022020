import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
//  { path: 'calendar', component: CalendarComponent },
 // { path: '', pathMatch: 'full', redirectTo: 'customer-list'},
 // { path: 'customer-list', component: CustomerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
