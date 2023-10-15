import {Component, ViewEncapsulation} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { UserService } from '../services/user.service';
import { TransactionService } from '../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent {
  activeTabIndex = 0; // Default active tab index

  constructor(    private router: Router,
    private userService: UserService, private transactionService: TransactionService) {

  }
  onTabChange(event: any) {
    this.activeTabIndex = event.index;
  }
  transactions : any;
  userID: any;

  async ngOnInit(): Promise<void> {
    if (sessionStorage.length == 0) {
      window.alert("Need to Login first!")
      this.router.navigate(['/']);
    }
    this.userID = parseInt(sessionStorage.getItem('userID'));
    console.log(this.userID)

    // GET USER Detail from UserID
    try {
      this.transactions = await this.transactionService.getTransactionsByID(this.userID)
    } catch (error) {
      console.log(error);
    }
    console.log(this.transactions)
    console.log(this.userID)
  }

}
