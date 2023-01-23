import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { RegisterFormService } from 'src/app/services/register-form.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  myForm!: FormGroup;
  myForm2!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cookies: CookieService,
    private registerFormService: RegisterFormService,
    private router: Router,
    private shared: SharedService
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
          this.fullNameValidator(),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
          this.emailValidator(),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
          this.phoneValidator(),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
          this.passRegValidator(),
        ],
      ],
    });

    this.myForm2 = this.fb.group({
      confirm_password: [
        '',
        [this.confirmPassValidator(this.myForm.get('password'))],
      ],
    });
  }

  get name() {
    return this.myForm.get('name');
  }
  get email() {
    return this.myForm.get('email');
  }
  get phone() {
    return this.myForm.get('phone');
  }
  get password() {
    return this.myForm.get('password');
  }
  get confirm_password() {
    return this.myForm2.get('confirm_password');
  }

  responseHandler(res: any) {
    this.shared.setEmail(this.myForm.value.email)
    this.cookies.delete('auth_token')
    console.log("register_res:",res)
    this.cookies.set('auth_token', res.accessToken);
    this.router.navigateByUrl('/user-table');
  }

  async submitHandler() {
    const formValue = this.myForm.value;

    const submit_res = this.registerFormService
      .registerRequest(formValue)
      .subscribe({
        next: (v) => this.responseHandler(v),
        error: (e) => alert(e.error.msg),
      });
  }

  passCheck(pass: string) {
    const cap_pat = /[A-Z]/;
    const small_pat = /[a-z]/;
    const num_pat = /[0-9]/;
    const cap_check = cap_pat.test(pass);
    const small_check = small_pat.test(pass);
    const num_check = num_pat.test(pass);
    if (cap_check === true && small_check === true && num_check === true) {
      return true;
    } else {
      return false;
    }
  }

  regCheck(str: string, type: string) {
    const email_pat = /^(([a-zA-Z0-9\_\-\.]+)@([a-zA-Z]+).([a-zA-Z]+))$/g;
    const name_pat = /^((([a-zA-Z]+)([\s]?))+)$/g;
    const phone_pat = /^([0-9]+)$/g;
    if (type === 'email') {
      const email_checker = email_pat.test(str);
      return email_checker;
    } else if (type === 'name') {
      const name_checker = name_pat.test(str);
      return name_checker;
    } else if (type === 'phone') {
      const phone_checker = phone_pat.test(str);
      return phone_checker;
    }
    return true;
  }

  passRegValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.passCheck(control.value) === true) {
        return null;
      } else {
        return {
          passReg:
            'Password must contain 1 upper-case letter, 1 lower-case letter, 1 number.',
        };
      }
    };
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        this.regCheck(control.value, 'email') === true ||
        control.value.length <= 0
      ) {
        return null;
      } else {
        return { Format: 'Email is not Valid' };
      }
    };
  }

  fullNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        this.regCheck(control.value, 'name') === true ||
        control.value.length <= 0
      ) {
        return null;
      } else {
        return { Format: 'Name is not Valid' };
      }
    };
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        this.regCheck(control.value, 'phone') === true ||
        control.value.length <= 0
      ) {
        return null;
      } else {
        return { Format: 'Phone Number is not Valid' };
      }
    };
  }

  confirmPassValidator(pass: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value !== pass.value) {
        return { Confirm: 'Passwords do not match.' };
      } else {
        return null;
      }
    };
  }
}
