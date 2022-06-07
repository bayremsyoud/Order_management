import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AuthService } from '@core/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.scss']

})
export class LoginComponent implements OnInit {
  isSubmitting = false;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });


  show = false;
  showWrong = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit() {}

  get email() {
    return this.loginForm.get('email');
  }

  get pass() {
    return this.loginForm.get('pass');
  }

mesgerr : number = 0;
wrong : String =''
msg =''
desc =''
desc2=''
active = false;


  login() {
    if (!this.loginForm.valid) {
      this.showWrong = true;
      this.wrong = 'weeeeeee';
      this.mesgerr = 2;
      this.setTime();
    } else {
      this.auth
        .login(this.email?.value, this.pass?.value)
        .pipe(filter(authenticated => authenticated))
        .subscribe(
          () => this.router.navigateByUrl('/'),
          res => {
            if (res) {
              switch (res.error.text) {
                case 'user not Active':
                  this.show = true;
                  this.msg = 'Account is Inactive';
                  this.desc = 'Please wait until we activate your account';
                  this.desc2 = 'We will activate it very soon';
                  break;
                case 'user isBlocked':
                  this.show = true;
                  this.msg = 'Account Is Blocked';
                  this.desc = 'Your account is blocked by admin';
                  this.desc2 = 'Contact the admin to resolve your account';
                  break;
                case 'Invalid password':
                  this.showWrong = true;
                  this.wrong = 'Invalid Password';
                  this.mesgerr = 1;
                  this.setTime();

                  break;
                case 'Invalid email or password':
                  this.showWrong = true;
                  this.mesgerr = 2;
                  this.wrong = 'Invalid Email or Password';
                  this.setTime();
                  break;
              }
            }
          }
        );
    }
  }

  setTime() {
    setTimeout(() => {
      this.showWrong = false;
      if (this.mesgerr == 1) {
        this.loginForm.controls.password.reset();
      } else {
        this.loginForm.reset();
      }
    }, 1500);
  }

  back() {
    this.show = !this.show;
    this.loginForm.reset();
  }


}
