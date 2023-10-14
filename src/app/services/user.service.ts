import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getAllProducts(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
  async searchEmail(email: string) {
    let result = await lastValueFrom(
      this.http.get<any>(environment.WSURL + '/users/getEmail/' + email)
    );

    // if (!result.result) {
    //   throw Error(result.error);
    // }
    // console.log(result.data);
    return result.data;
  }

  async checkPassword(email: string, pwd: String) {
    let result = await lastValueFrom(
      this.http.get<any>(
        environment.WSURL + '/users/checkPassword/' + email + '/' + pwd
      )
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
