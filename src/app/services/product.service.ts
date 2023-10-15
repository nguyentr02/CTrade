import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  async getAllProducts() {
    let result = await lastValueFrom(
      this.http.get<any>(environment.WSURL + '/products/all')
    );

    if (!result.result) {
      throw Error(result.error);
    };

    console.log(result);
    return result.result;
  }

  async getProducts(Category: Number) {
    let result = await lastValueFrom(
      this.http.get<any>(environment.WSURL + '/products/' + Category)
    );

    if (!result.result) {
      throw Error(result.error);
    };

    console.log(result);
    return result.result;
  }

  async getProductsByName(Name: string) {
    let result = await lastValueFrom(
      this.http.get<any>(environment.WSURL + '/products/search/' + Name)
    );

    if (!result.result) {
      throw Error(result.error);
    };

    console.log(result);
    return result.result;
  }
  async getProductbyID(id: Number) {
    let result = await lastValueFrom(
      this.http.get<any>(environment.WSURL + '/products/ID/' + id)
    );

    if (!result.result) {
      throw Error(result.error);
    };

    console.log(result);
    return result.result;
  }


  // For storing ProdID
  ProdId: any;
  saveProdID(id:number) {
    this.ProdId = id;
  }

  getProdID() {
    return this.ProdId;
  }
}
