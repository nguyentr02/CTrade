import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent {
  constructor(
    private userService: UserService,
    private productService: ProductService,
  ) {}
  products: any;
 


  // Get Data from Search result

    search?: string;
    async reloadPage($event) {
      this.search = $event;
      console.log("SEARCH NE");
      try {
        this.products = await this.productService.getProductsByName(this.search);
        console.log(this.products);
      } catch (error) {
        console.log(error);
      }
    }

  // ______________________________________

  async ngOnInit(): Promise<void> {

    // Get Data to Render products on Market page
    try {
      this.products = await this.productService.getAllProducts();
      console.log(this.products);
    } catch (error) {
      console.log(error);
    }
  }

  filter_status = 1;
  async filter() {
    // If filter_status = 4 then show all product which is no filter
    if (this.filter_status == 4) {
      try {
        this.products = await this.productService.getAllProducts();
        console.log(this.products);
      } catch (error) {
        console.log(error);
      }
      // After get Data, move back to 1 so next click show category 1
      this.filter_status = 1;
    } else {
      try {
        this.products = await this.productService.getProducts(this.filter_status);
      } catch (error) {
        console.log(error);
      }
      // Increase filter_status so that next click show next category
      this.filter_status = this.filter_status + 1;
    }
  }
}
