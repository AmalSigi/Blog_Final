import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
@Injectable({
  providedIn: 'root',
})
export class commentsApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = `${environment.url}/Comment`;

  public getSingleComment(commentId: number): Observable<any> {
    return this.http.get(`${this.url}/${commentId}`);
  }
  public getAllCommentsByPostAdmin(postId: number): Observable<any> {
    return this.http.get(`${this.url}/${postId}/all`);
  }

  public getAllReportd(): Observable<any> {
    return this.http.get(`${this.url}/reported`);
  }

  public postComment(postId: number, comment: any): Observable<any> {
    return this.http.post(`${this.url}/new/${postId}`, comment);
  }
  public getAllCommentsByPostAuthor(postId: number): Observable<any> {
    return this.http.get(`${this.url}/ownPosts/${postId}/all`);
  }

  public postGuestUserComment(postId: number, comment: any): Observable<any> {
    return this.http.post(`${this.url}/newguestcomment/${postId}`, comment);
  }
  public reportComment(commentId: number): Observable<any> {
    return this.http.patch(`${this.url}/${commentId}/report`, {});
  }
  public removeComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.url}/${commentId}/delete`, {});
  }
  public getCommentsCount(postId: number, status: string): Observable<any> {
    return this.http.get(`${this.url}/${postId}/count?status=${status}`);
  }
  public getCommentsReportedId(
    postId: number,
    status: string
  ): Observable<any> {
    return this.http.get(`${this.url}/${postId}/all?status=${status}`);
  }
  public getAllCommentsForBolg(postid: number): Observable<any> {
    return this.http.get(`${this.url}/blog/${postid}/all`);
  }

  // delete
  public removeCommentdeletePermanently(commentId: number): Observable<any> {
    return this.http.delete(`${this.url}/${commentId}/deletePermanently`, {});
  }
}
