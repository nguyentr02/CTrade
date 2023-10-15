import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../services/product.service';
import { TransactionService } from '../services/transaction.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private transactionService: TransactionService,
    // private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  amount = new FormControl('');

  products: any;
  productID: any;
  async ngOnInit(): Promise<void> {
    try {
      this.productID = this.productService.getProdID();
      this.products = await this.productService.getProductbyID(this.productID);
      this.products = this.products[0];
    } catch (error) {
      console.log(error);
    }
  }
  seclectedProduct: any;
  now = new Date();
  transaction: any;
  async buyFunc(amount: string) {
    console.log(this.amount.value);
    if (this.validate(this.amount.value)) {
      try {
        this.transaction = this.transactionService.addTrans(
          parseInt(sessionStorage.getItem('userID')),
          this.productID,
          this.products.ProdName,
          parseInt(amount),
          this.products.ProdPrice,
          this.now,
          'Completed',
          'Buy'
        );
      } catch (error) {
        console.log(error);
      }

      this.dialog.closeAll();
    } else {
      window.alert('Wrong input Format');
    }
  }

  async sellFunc(amount: string) {
    if (this.validate(this.amount.value)) {
      try {
        this.transaction = this.transactionService.addTrans(
          parseInt(sessionStorage.getItem('userID')),
          this.productID,
          this.products.ProdName,
          parseInt(amount),
          this.products.ProdPrice,
          this.now,
          'Completed',
          'Sell'
        );
      } catch (error) {
        console.log(error);
      }

      this.dialog.closeAll();
    } else {
      window.alert('Wrong input Format');
    }
  }

  // Function to validate input. Only number 0-9 and '.' is acceptable
  validate(s: string) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
  }
}
