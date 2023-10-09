import { Component } from '@angular/core';
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

  async ngOnInit(): Promise<void> {
    
    // Get Data to Render products on Market page
    try {
      this.products = await this.productService.getAllProducts();
      console.log(this.products);
    } catch (error) {
      console.log(error);
    }
  }
}
