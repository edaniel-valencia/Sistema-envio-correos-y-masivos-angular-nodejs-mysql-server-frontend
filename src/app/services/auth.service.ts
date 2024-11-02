import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = "http://localhost:3002/"
    this.myApiUrl = "api/admin"
  }


 

  loginAdmin(admin: Admin): Observable<any> {
    
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/auth`, admin);
  }
}
