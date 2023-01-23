import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../User';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserTableService {

  constructor(private http: HttpClient, private cookies:CookieService) { }
  
  private getURL = "http://localhost:5000/api/users"

  private delURL = "http://localhost:5000/api/users/delete/"

  getUsers(): Observable<User[]>{
    let headerDict = {
      authorization: `bearer ${this.cookies.get('auth_token')}`,
    };
    let requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<User[]>(this.getURL, requestOptions)
  }

  deleteUser(del_email: any): Observable<any>{
    let headerDict = {
      authorization: `bearer ${this.cookies.get('auth_token')}`,
    };
    let requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.delete(this.delURL+del_email,requestOptions)
  }

}
