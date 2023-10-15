import { Component, Input } from '@angular/core';
import { Product } from '../interface/product';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'coin-card',
  templateUrl: './coin-card.component.html',
  styleUrls: ['./coin-card.component.css'],
})
export class CoinCardComponent {
  @Input() items: any;

  constructor(public dialog: MatDialog, private productService: ProductService) {}
  async ngOnInit(): Promise<void> {
    console.log(this.items);
  }
  isDialogOpen = true;
  openDialog(data?: any) {
    if (this.isDialogOpen == false) {
      const dialogRefsub = this.dialog.open(DialogComponent, {
        height: '410px',
        width: '600px',
        data: data,
      });
      // dialogRefsub.afterClosed().subscribe(async () => {
      //   this.item = 
      // })

      this.isDialogOpen = true;

      this.productService.saveProdID(this.items.ProdID);
    } else {
      this.isDialogOpen = false;
      this.dialog.closeAll();
    }
  }

}
