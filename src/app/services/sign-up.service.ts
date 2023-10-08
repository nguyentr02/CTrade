import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor( private http:HttpClient) { }

  async searchEmail(email : string) {
    let result = await lastValueFrom(
      this.http.get<any>(environment.WSURL + "/users/getEmail/" + email)
    );

    if (!result.result) {
      throw Error(result.error);
    }
    console.log(result);
    return result.emails;
  }
}
