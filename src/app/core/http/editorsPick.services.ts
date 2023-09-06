import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class editorsPickApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/api/EditorsPick';
  public EditorsPick(): Observable<any> {
    return this.http.get(
      `${this.url}/picks`
    );
  }
  public postEditorsPick(postId: any): Observable<any> {
    return this.http.post(`${this.url}/newpick`, postId);
  }
  public getBlogEditorsPick(): Observable<any> {
    return this.http.get(`${this.url}/blog/picks?&length=3`);
  }
  public deletepick(pickId: number): Observable<any> {
    return this.http.delete(`${this.url}/${pickId}/delete`);
  }
}
