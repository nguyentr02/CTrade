import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { async } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  firstName = new FormControl('', [Validators.required]);
  givenName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorGivenNameMessage() {
    if (this.givenName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.givenName.hasError('name');
  }

  getErrorFirstNameMessage() {
    if (this.firstName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.firstName.hasError('name');
  }

  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  user: any;
  userName: any;

  // Adding details to database
  async verifyAccount(
    userEmail: any,
    pwd: any,
    confirmedPwd: any,
    fName: any,
    gName: any
  ) {
    // let data = {
    //   fName: this.firstName,
    //   lName: this.givenName,
    //   email: this.email,
    //   pwd: this.password,
    // };

    // If any of the fields show error then do NOT process to create account
    if (this.getErrorPasswordMessage() != false) {
      window.alert('Password Error!');
      console.log(this.getErrorPasswordMessage());
      return;
    }
    if (this.getErrorEmailMessage() != '') {
      window.alert('Email Error!');
      return;
    }
    if (this.getErrorFirstNameMessage() != false) {
      window.alert('First Name Error!');
      return;
    }
    if (this.getErrorGivenNameMessage() != false) {
      window.alert('Given Name Error!');
      return;
    }
    // ____________________________________________________________

    // Check if email is already exist in Dtb
    try {
      this.user = await this.userService.searchEmail(userEmail.value);
      console.log(this.user);
    } catch (error) {
      console.log(error);
    }

    if (this.user.length != 0) {
      window.alert('This email is alreay exist! Please use other email!');
      return;
    } else {
      // window.alert("Create successful!");
      if (pwd.value != confirmedPwd.value) {
        // console.log(pwd.value + "is != " + confirmedPwd.value);
        window.alert('Confirm password is different!');
        return;
      } else {
        this.user = null;
        this.userName = fName.value + gName.value;
        // Everything is PASS, now create new account

        try {
          this.user = this.userService.addUser(
            userEmail.value,
            pwd.value,
            this.userName,
            fName.value,
            gName.value
          );
        } catch (error) {
          console.log(error);
        }
      }
    }

    this.router.navigate(['/']);
  }

  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password');
  }
  async ngOnInit(): Promise<void> {}
}
