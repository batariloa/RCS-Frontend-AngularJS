import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { StatusComponent } from './components/status/status.component';
import { FormsModule } from '@angular/forms';
import { AuthGaurdService } from './services/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StatusComponent,
    RegisterComponent,

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [AuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
