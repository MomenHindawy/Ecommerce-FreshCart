import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)


  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  step = 1;

  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  });
  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6,}$/)]]
  });
  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  });


  sendEmail(): void {


    let emailValue = this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)

    this._AuthService.setVerifyEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg == 'success') {
          this.step = 2;
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  sendVerifyCode(): void {
    this._AuthService.setVerifyCode(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'Success') {
          this.step = 3;
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  restPassword(): void {
    this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('UserToken', res.token)
        this._AuthService.saveUserData
        this._Router.navigate(['/home'])
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
