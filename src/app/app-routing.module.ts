import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateUrlComponent, MyAccountComponent, RegisterComponent, HomeComponent, LoginComponent } from './components';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: 'generate-url', component: GenerateUrlComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
