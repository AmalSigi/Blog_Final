import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/enviroment/enviroment';
@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private readonly http: HttpClient) {}
  public url: string = `${environment.url}/ContactUs`;

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
