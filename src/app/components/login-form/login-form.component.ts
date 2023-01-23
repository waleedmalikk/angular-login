import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LoginFormService } from 'src/app/services/login-form.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  loading = false;
  success = false;

  constructor(
    private fb_login: FormBuilder,
    private loginFormService: LoginFormService,
    private cookies: CookieService,
    private router: Router,
    private shared: SharedService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb_login.group({
      email: [
        '',
        [Validators.minLength(5), Validators.maxLength(40), this.emptyCheck()],
      ],
      password: [
        '',
        [Validators.minLength(5), Validators.maxLength(40), this.emptyCheck()],
      ],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  responseHandler(res: any) {
    this.shared.setEmail(this.loginForm.value.email);
    this.cookies.delete('auth_token');
    this.cookies.set('auth_token', res.accessToken);
    this.router.navigateByUrl('/user-table');
  }

  submitHandler() {
    const formData = this.loginForm.value;

    const submit_res = this.loginFormService.loginRequest(formData).subscribe({
      next: (v) => this.responseHandler(v),
      error: (e) => alert(e.error.msg),
    });
  }
  emptyCheck(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.length <= 0) {
        return { Error: 'Empty String' };
      } else {
        return null;
      }
    };
  }
}
