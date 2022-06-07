import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@core';
import { User } from 'app/routes/users/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  confirmValidator = (control: FormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  registerForm : FormGroup = new FormGroup({
    nomUser: new FormControl ( ['', [Validators.required, Validators.minLength(4)]]),
      prenomUser:new FormControl( ['', [Validators.required, Validators.minLength(4)]]),
      numUser: new FormControl (['', [Validators.required, Validators.minLength(4)]]),
      emailUser:new FormControl( ['', [Validators.required, Validators.email]]),
      passUser: new FormControl (['', [Validators.required, Validators.minLength(4)]]),
      roleUser: new FormControl (['',[Validators.required]]),
      update_at:new FormControl (),
      register_at:new FormControl (new Date()),
      isActive: new FormControl (false),
      isBlocked: new FormControl (false),
      isAdmin: new FormControl (false),


  });
show = false;


  addUser(){
    this.authServ.register(this.registerForm.value).subscribe(res =>{
      this.show = true;
    }

    )

  }

  constructor(private fb: FormBuilder,private authServ : AuthService) {}

  ngOnInit() {}
}
