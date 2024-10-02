import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  registerService(registerObj: any) {
    return this.http.post<any>(
      `${apiUrls.authServiceApi}register`,
      registerObj
    );
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj, {
      withCredentials: true,
    });
  }
  isLoggedIn() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
  }
  checkAdminStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.isAdminSubject.next(payload.user.isAdmin);
      } catch (e) {
        console.error('Error decoding token:', e);
        this.isAdminSubject.next(false);
      }
    } else {
      this.isAdminSubject.next(false);
    }
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdmin$;
  }
}
