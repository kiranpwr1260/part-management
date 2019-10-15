import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule} from "@angular/forms";
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './login/shared/auth/auth.service';
import { EventService } from './event.service';
import { AuthGuard } from './shared/auth-guard/auth.guard';
import { TokenInterceptorService } from './shared/token-interceptor/token-interceptor.service';
import { HttpServiceService } from './shared/http-service/http-service.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import { InventoryComponent } from './inventory/inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ModalModule } from 'ngx-bootstrap';
import { CartComponent } from './cart/cart.component';
import { PartComponent } from './part/part.component';
import { BsDatepickerModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    SpecialEventsComponent,
    DashboardComponent,
    InventoryComponent,
    CartComponent,
    PartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService,EventService,AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    },
  HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
