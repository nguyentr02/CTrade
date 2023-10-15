import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-personal-infomation',
  templateUrl: './personal-infomation.component.html',
  styleUrls: ['./personal-infomation.component.css'],
})
export class PersonalInfomationComponent {
  constructor(private router: Router, private userService: UserService) {}
  userID: any;
  user: any;
  async ngOnInit(): Promise<void> {
    // Check whether login or not by looking at
    if (sessionStorage.length == 0) {
      window.alert('Need to Login first!');
      this.router.navigate(['/']);
    }

    this.userID = parseInt(sessionStorage.getItem('userID'));

    // Get USER data
    // try {
    //   this.user = this.userService.searchID(this.userID);
    //   // console.log(this.userID);
    // } catch (error) {
    //   console.log(error);
    // }
    // // this.user = this.user[0]
    // console.log(this.user);

    try {
      this.user = await this.userService.searchID(this.userID);
    } catch (error) {
      console.log(error);
    }
    // this.user= this.user[0]
  }

  logOut() {
    sessionStorage.removeItem('userID');
  }
}
