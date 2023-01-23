import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { EditFormService } from 'src/app/services/edit-form.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent {
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cookies: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private editFormService: EditFormService
  ) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
          this.fullNameValidator(),
        ],
      ],
      email: [``],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
          this.phoneValidator(),
        ],
      ],
    });

    this.route.params.subscribe((params) =>
      this.editForm.patchValue({ email: params['email'] })
    );
  }

  get name() {
    return this.editForm.get('name');
  }

  get email() {
    return this.editForm.get('email');
  }

  get phone() {
    return this.editForm.get('phone');
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

  fullNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.regCheck(control.value, 'name') === true) {
        return null;
      } else {
        return { Format: 'Name is not Valid' };
      }
    };
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.regCheck(control.value, 'phone') === true) {
        return null;
      } else {
        return { Format: 'Phone Number is not Valid' };
      }
    };
  }

  responseHandler() {
    alert('User Edit Successfully.');
    this.router.navigateByUrl('/user-table');
  }

  cancelHandler() {
    this.router.navigateByUrl('/user-table');
  }

  submitHandler() {
    const formData = this.editForm.value;

    const submit_res = this.editFormService.editRequest(formData).subscribe({
      next: () => this.responseHandler(),
      error: (e) => alert(e.error.msg),
    });
  }
}
