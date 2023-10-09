import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(private router: Router, private http: HttpClient) {

    }

    firstName = new FormControl('', [Validators.required])
    givenName = new FormControl('', [Validators.required])
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('',[Validators.required]);

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

    // Adding details to database
    verifyAccount() {
        let data = {
            "fName" : this.firstName,
            "lName" : this.givenName,
            "email" : this.email,
            "pwd" : this.password
        }

        // Check if email is already exist in Dtb
        // this.http.get("")

        // this.http.post(environment.WSURL + "/users/signup", data).subscribe((result:any) => {
        //     console.log("SignUp data: ",data);

        // })


        this.router.navigate(['/market']);
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
