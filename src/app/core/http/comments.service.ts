import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class commentsApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/Comment';
  public getSingleComment(commentId: number): Observable<any> {
    return this.http.get(`${this.url}/${commentId}`);
  }
  public getAllCommentsByPost(postId: number): Observable<any> {
    return this.http.get(`${this.url}/${postId}/all`);
  }
  public postComment(postId: number, comment: any): Observable<any> {
    return this.http.post(`${this.url}/new/${postId}`, comment);
  }
  public reportComment(commentId: number): Observable<any> {
    return this.http.patch(`${this.url}/${commentId}/report`, {});
  }
  public removeComment(commentId: number): Observable<any> {
    return this.http.patch(`${this.url}/${commentId}/remove`, {});
  }
}
