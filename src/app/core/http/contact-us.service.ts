import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/api/ContactUs';

  public getAllContact(
    read: any,
    length: number,
    offset: number
  ): Observable<any> {
    return this.http.get(
      `${this.url}/all?read=${read}&length=${length}&offset=${offset}`
    );
  }
  public getAllContactNo(read: any): Observable<any> {
    return this.http.get(`${this.url}/all?read=${read}`);
  }
  public getContactByEmail(email: any): Observable<any> {
    return this.http.get(`${this.url}/byEmail/${email}`);
  }

  public postContactMessage(message: any): Observable<any> {
    return this.http.post(`${this.url}/newMessage`, message);
  }

  public getMessagesById(messageId: number): Observable<any> {
    return this.http.get(`${this.url}/${messageId}`);
  }
}
