import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class authenticationApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/Authentication';
  public login(body: any): Observable<any> {
    return this.http.post(`${this.url}/login`, body);
  }
  public isAuthorized(): Observable<any> {
    return this.http.post(`${this.url}/isAuthorized`, {});
  }
  public getRefreshToken(): Observable<any>{
    return this.http.post(`${this.url}/Authentication/refreshToken)`,{});
  }
  public logOut(): Observable<any>{
    return this.http.post(`${this.url}/Authentication/logout`,{});
  }
}
