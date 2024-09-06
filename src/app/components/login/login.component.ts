import { Component, inject, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/Services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)
  private readonly _AuthService = inject(AuthService)

  isPasswordVisible:boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }






  msgSuc: boolean = false;
  isLoading: boolean = false;




  loginForm: FormGroup = this._FormBuilder.group
    ({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
    })
  loginsumbit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == "success") {
            this.msgSuc = true;
            setTimeout(() => {
              localStorage.setItem('UserToken', res.token);


              this._AuthService.saveUserData()

              this._Router.navigate(['./home'])

            }, 1000);
            this.isLoading = false;
          }

        }
      })
    }
    else {
      this.loginForm.setErrors({ mismatch: true }),
        this.loginForm.markAllAsTouched()
    }
  }

}
