import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateUrlComponent, MyAccountComponent, RegisterComponent, HomeComponent, LoginComponent } from './components';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'generate-url', component: GenerateUrlComponent },
  { path: '',   redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
