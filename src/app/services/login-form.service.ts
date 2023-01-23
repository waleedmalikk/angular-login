import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  private restURL = 'http://localhost:5000/api/users/login';

  loginRequest(data: any): Observable<any> {
    let headerDict = {
      authorization: `bearer ${this.cookies.get('auth_token')}`,
    };
    let requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const login_res = this.http.post(this.restURL, data, requestOptions);
    return login_res;
  }
}
