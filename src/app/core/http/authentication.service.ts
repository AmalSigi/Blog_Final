import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
@Injectable({
  providedIn: 'root',
})
export class authenticationApi {
  constructor(private readonly http: HttpClient) {}

  public url: string = `${environment.url}/Authentication`;
  public login(body: any): Observable<any> {
    return this.http.post(`${this.url}/login`, body);
  }
  public isAuthorized(): Observable<any> {
    return this.http.post(`${this.url}/isAuthorized`, {});
  }
  public getRefreshToken(): Observable<any> {
    return this.http.post(`${this.url}/Authentication/refreshToken)`, {});
  }
  public logOut(): Observable<any> {
    return this.http.post(`${this.url}/Authentication/logout`, {});
  }
}
