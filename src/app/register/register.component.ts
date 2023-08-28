import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(private router: Router) {

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

    verifyAccount() {
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
