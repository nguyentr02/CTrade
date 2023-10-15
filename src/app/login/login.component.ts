import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { UserService } from '../services/user.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  
  constructor(
    private router: Router,
    private userService: UserService
    ) {

  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required]);
  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  user: any;
  userID: any;
  emailData: any;
  async verifyAccount(userEmail:any,userPassword: any) {
    // this.router.navigate(['/market']);


    // Only proceed when type in valid email and password
    if ((this.email.value != "") && (this.password.value != "")) {
      if ((this.email.valid) && (this.password.valid)) {
        try {
          this.emailData = await this.userService.searchEmail(userEmail.value);
          console.log(this.user);
        } catch (error) {
          console.log(error);
        }
        // console.log(this.emailData.length);
        if (this.emailData.length == 0) {
          window.alert("Cannot find account");
          // console.log("Cannot find account");
        } else {
          try {
            this.user = await this.userService.checkPassword(userEmail.value,userPassword.value);
          } catch (error) {
            console.log(error);
          }
          // console.log(this.user);
          if (this.user.length == 0) {
            window.alert("Wrong Password");
            // console.log("Wrong Password");
          } else {
            // Correct email and password
            console.log("Correct!!!")
            
            this.userID = this.user[0].UserID;
            // this.userService.setUserID(this.userID);

            sessionStorage.removeItem('userID')
            sessionStorage.setItem('userID',this.userID);
            this.router.navigate(['/market']);
          }
        }
      }
    }

  }
  getErrorPasswordMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('password');
  }
  async ngOnInit(): Promise<void> {
    
  }


}
