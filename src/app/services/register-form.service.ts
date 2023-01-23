import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  private RegisterEndPoint = 'http://localhost:5000/api/users/register';

  registerRequest(data: any): Observable<any> {
    let header = `bearer ${this.cookies.get('auth_token')}`;

    let requestOptions = {
      headers: new HttpHeaders(header),
    };
    const register_res = this.http.post(
      this.RegisterEndPoint,
      data,
      requestOptions
    );
    return register_res;
  }
}
