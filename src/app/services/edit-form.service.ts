import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditFormService {

  constructor(private http: HttpClient) { }
  
  private editURL = 'http://localhost:5000/api/users/'

    
   editRequest(data:any): Observable<any> {
    const login_res=  this.http.put(this.editURL, data)
    return login_res
  }
}
