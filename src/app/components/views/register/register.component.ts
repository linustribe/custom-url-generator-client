import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  showPassword: boolean = false;
  passwordType: string = 'password';
  showConfirmPassword: boolean = false;
  confirmPasswordType: string = 'password';
  submitted: boolean = false;
  notMatched: boolean = false;

  constructor(private formBuild:FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuild.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    })
  }
  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }

  checkConfirmPassword(): void {
    if(this.password.value == this.confirmPassword.value)
      this.notMatched = false;
    else
      this.notMatched = true
  }


  toggleShowPassword(): void {
    if(this.passwordType === 'password') {
      this.passwordType = 'text'
    } else {
      this.passwordType = 'password'
    }
    this.showPassword = !this.showPassword;
  }
  
  toggleShowConfirmPassword(): void {
    if(this.confirmPasswordType === 'password') {
      this.confirmPasswordType = 'text'
    } else {
      this.confirmPasswordType = 'password'
    }
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
  submitForm() {
    this.submitted = true;
    if(!this.registerForm.invalid) {
      if(this.password.value != this.confirmPassword.value) {
        this.notMatched = true
      } else {
        console.log(this.registerForm.value)
      }
    }
  }
}
