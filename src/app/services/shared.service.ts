import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private loggedInEmail = new BehaviorSubject<any>('');

  setEmail(email: any) {
    this.loggedInEmail.next(email);
  }

  getEmail(): Observable<any> {
    return this.loggedInEmail.asObservable();
  }
}
