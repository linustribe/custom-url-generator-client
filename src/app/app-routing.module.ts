import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateUrlComponent, MyAccountComponent, RegisterComponent, HomeComponent, LoginComponent } from './components';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [UserGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UserGuard] },
  { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: 'generate-url', component: GenerateUrlComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
