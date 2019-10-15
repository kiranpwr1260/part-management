import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthGuard } from './shared/auth-guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CartComponent } from './cart/cart.component';
import { PartComponent } from './part/part.component';


const routes: Routes = [
  {
    path : "",
    redirectTo : "/inventory",
    pathMatch : "full"
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "register",
    component : RegisterComponent
  },
  {
    path : "dashboard",
    component : DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "inventory",
    component : InventoryComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "cart",
    component : CartComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "part",
    component : PartComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "specialEvents",
    component : SpecialEventsComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }