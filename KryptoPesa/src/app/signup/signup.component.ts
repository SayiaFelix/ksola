import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../Helper/validateForm';
import { AuthService } from '../service/auth.service';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public SignupForm!: FormGroup;
  visible: boolean = false;
  changepass: boolean = true;
  private _registerUrl = "http://localhost:3000/users/"

  viewpass() {
    this.visible = !this.visible;
    this.changepass = !this.changepass;
  }

  MatchPass(passName: string, confirmPassName: string) {
    return (formGroup: FormGroup) => {

      const control = formGroup.controls[passName];
      const matchingControl = formGroup.controls[confirmPassName];

      if (matchingControl.errors && !matchingControl.errors['MatchPass']) {
        return
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MatchPass: true });
      }
      else {
        matchingControl.setErrors(null);
      }
    }

  }
  constructor
    (
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router,
      private toast: NgToastService,
      private auth: AuthService,
      private log: NavService
    ) { }

  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern("^((\\+254-?)|0)?[0-9]{12}$")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      cpassword: ['', Validators.required]
    }
      , {
        validators: this.MatchPass('password', 'cpassword')
      })
    this.log.show()
  }

  Signup() {
    if (this.SignupForm.valid) {
      console.log(this.SignupForm.value);
      this.http.post<any>(this._registerUrl, this.SignupForm.value)
        .subscribe(res => {
          this.toast.success({ detail: 'Success Message', summary: "Registration Completed Successfully!!", duration: 5000 })
          // alert('Signup successfully');
          this.SignupForm.reset();
          this.router.navigate(['login']);
        }, err => {
          this.toast.error({ detail: 'Failed Message', summary: "Registration Failed, Something Went wrong!!", duration: 5000 })
          // alert('something went wrong')

        })
      // send obj to db

    } else {
      ValidateForm.validateAllFormFields(this.SignupForm)
      alert('Your Form is Empty')
    }

  }
}
