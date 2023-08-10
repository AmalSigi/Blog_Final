import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class userApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/UserAccount';
  public registerUser(body: any): Observable<any> {
    return this.http.post(`${this.url}/registeruser`, body);
  }
  public userSignUp(body: any): Observable<any> {
    return this.http.post(`${this.url}/usersignup`, body);
  }
  public getUserAccount(userId: number): Observable<any> {
    return this.http.get(`${this.url}/${userId}`);
  }
  public currentUserDetails(): Observable<any> {
    return this.http.get(`${this.url}/currentUserDetails`);
  }
  public getAllUsers(offsetValue: number, pageLength: number): Observable<any> {
    return this.http.get(
      `${this.url}/allusers?offset=${offsetValue}&length=${pageLength}`
    );
  }
  public updateUserDetails(userId: number, body: any): Observable<any> {
    return this.http.patch(`${this.url}/${userId}/updatedetails`, body);
  }
  public updateUserProfilePic(
    userId: number,
    imgPath: FormData
  ): Observable<any> {
    return this.http.patch(`${this.url}/${userId}/updateprofilepic`, imgPath);
  }
  public updatePassword(body: any): Observable<any> {
    return this.http.post(`${this.url}/UpdateOwnPassword`, body);
  }
  public userRoles(): Observable<any> {
    return this.http.get(`${this.url}/roles`);
  }
  public updateRoles(userId: number, body: any): Observable<any> {
    return this.http.patch(`${this.url}/${userId}/updateroles`, body);
  }
  public resetpassword(userId: number, body: any): Observable<any> {
    return this.http.patch(`${this.url}/${userId}/resetpassword`, body);
  }
  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.url}/${userId}/delete`);
  }
  public changeUserStatus(userId: number, status: string): Observable<any> {
    return this.http.patch(`${this.url}/${userId}/${status}`, {});
  }
}
