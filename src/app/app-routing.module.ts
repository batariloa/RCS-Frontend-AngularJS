import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StatusComponent } from './components/status/status.component';
import { AuthGaurdService } from './services/auth-guard.service';

const routes: Routes = [  
  { path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },

{ path: 'status', component: StatusComponent, canActivate: [AuthGaurdService]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
