import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient) { }

  async getTransactionsByID(id:number) {
    let result = await lastValueFrom(
      this.http.get<any>(environment.WSURL + '/transactions/' + id)
    );

    // if (!result.result) {
    //   throw Error(result.error);
    // };

    console.log(result);
    return result.result;
  }
}
