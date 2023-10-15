import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  async getTransactionsByID(id: number) {
    let result = await lastValueFrom(
      this.http.get<any>(environment.WSURL + '/transactions/' + id)
    );

    // if (!result.result) {
    //   throw Error(result.error);
    // };

    console.log(result);
    return result.result;
  }

  async addTrans(
    UserID: number,
    ProdID: number,
    ProdName: string,
    TransAmount: number,
    ProdPrice: Int16Array,
    TransDate: Date,
    Trans_Status: string,
    TransMethod: string
  ) {
    let result = await lastValueFrom(
      this.http.post<any>(environment.WSURL + '/transactions/add/', {
        UserID,
        ProdID,
        ProdName,
        TransAmount,
        ProdPrice,
        TransDate,
        Trans_Status,
        TransMethod,
      })
    );

    // if (!result.result) {
    //   throw Error(result.error);
    // }
    console.log(result.data);
    return result.data;
  }

  async addUser(
    userEmail: string,
    password: string,
    userName: string,
    fName: string,
    lName: string
  ) {
    let result = await lastValueFrom(
      this.http.post<any>(environment.WSURL + '/users/signUp', {
        userName,
        password,
        fName,
        lName,
        userEmail,
      })
    );

    if (!result.result) {
      throw Error(result.error);
    }
    console.log(result.data);
    return result.data;
  }
}
