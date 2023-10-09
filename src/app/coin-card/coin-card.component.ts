import { Component, Input } from '@angular/core';

@Component({
  selector: 'coin-card',
  templateUrl: './coin-card.component.html',
  styleUrls: ['./coin-card.component.css'],
})
export class CoinCardComponent {
  @Input() items:any = '';

  async ngOnInit(): Promise<void> {
    console.log(this.items);
  }
}
