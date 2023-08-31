import {Component, ViewEncapsulation} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent {
  activeTabIndex = 0; // Default active tab index

  onTabChange(event: any) {
    this.activeTabIndex = event.index;
  }
}
