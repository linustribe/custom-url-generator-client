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
  showConfirmPassword: boolean = false;
  passwordType: string = 'password';
  confirmPasswordType: string = 'password';
  submitted: boolean = false;
  isValid: boolean = false;
  passwordValidator = {
    lower: new RegExp('.*[a-z].*'),
    upper: new RegExp('.*[A-Z].*'),
    digit: new RegExp('.*[0-9].*')
  }

  constructor(private formBuild:FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuild.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^0-9]*[0-9]).{8,30}')]],
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
    this.isValid = this.password.value === this.confirmPassword.value;
  }


  toggleShowPassword(): void {
    this.passwordType = this.showPassword ? 'password': 'text'
    this.showPassword = !this.showPassword;
  }
  
  toggleShowConfirmPassword(): void {
    this.confirmPasswordType = this.showConfirmPassword ? 'password': 'text'
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
  submitForm() {
    this.submitted = true;
    if(!this.registerForm.invalid) {
      if(this.password.value != this.confirmPassword.value) {
        this.isValid = false
      } else {
        this.authService.register(this.email.value, this.password.value).subscribe(res => {
          res.status === "ok" ? this.router.navigateByUrl('login') : alert(res.message)
        })
      }
    }
  }
}
