import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../interfaces/email';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = "http://localhost:3002/"
    this.myApiUrl = "api/email"
   }


   SendEmailMasive(email: Email, file: File): Observable<any>{
    const formData = new FormData()
    formData.append('title', email.title || '')
    formData.append('message', email.message || '')
    formData.append('image', file, file.name)
    console.log(formData);
    
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/sendMasive`, formData)
   }


   SendEmailMasiveByCategory(email: Email, file: File, CategoryId: number): Observable<any>{
    const formData = new FormData()
    formData.append('title', email.title || '')
    formData.append('message', email.message || '')
    formData.append('image', file, file.name)
    console.log(formData);
    console.log(CategoryId);
    
    
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/sendMasiveByCategory/${CategoryId}`, formData)
   }


  // SendEmailMasive(email: Email): Observable<string>{
  //   return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/sendMasive`, email)
  //  }
   SendEmail(email: Email): Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/send`, email)
   }
}
