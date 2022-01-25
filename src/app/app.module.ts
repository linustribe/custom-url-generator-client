import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
import { RegisterComponent } from './components/views/register/register.component';
import { MyAccountComponent } from './components/views/my-account/my-account.component';
import { GenerateUrlComponent } from './components/views/generate-url/generate-url.component';
import { NavbarComponent } from './components/utils/navbar/navbar.component';
import { FooterComponent } from './components/utils/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MyAccountComponent,
    GenerateUrlComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
