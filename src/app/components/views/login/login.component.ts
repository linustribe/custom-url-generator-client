import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  passwordType: string = 'password';
  loginForm = new FormGroup({});
  submitted: boolean = false;
  message: string = "";

  constructor(private formBuild:FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuild.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }


  toggleShowPassword() {
    this.passwordType = this.showPassword ? 'password': 'text'
    this.showPassword = !this.showPassword;
  }

  forgotPassword() {
    if(this.email.valid) {
      this.authService.forgotPassword(this.email.value).subscribe(res => {
        this.message = res.message
      })
    } else {
      this.message = "Please enter valid email address"
    }
  }

  submitForm() {
    this.submitted = true;
    if(!this.loginForm.invalid) {
      this.authService.login(this.email.value, this.password.value).subscribe(res => {
        res.status === "ok" ? this.router.navigateByUrl('') : alert(res.message)
      })
    }
  }
}
