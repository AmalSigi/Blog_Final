import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class postsAPi {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/Post';
  public getPosts(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }
  public addPost(post: any): Observable<any> {
    return this.http.post(`${this.url}/addnewpost`, post);
  }
  public editPost(postId: number, postData: any): Observable<any> {
    return this.http.put(`${this.url}/${postId}/editpost`, postData);
  }
  public getPostById(postId: number): Observable<any> {
    return this.http.get(`${this.url}/${postId}`);
  }
  public approvePost(postId: number): Observable<any> {
    return this.http.patch(`${this.url}/${postId}/publish`, {});
  }
  public deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.url}/${postId}/delete`);
  }
  public addPostTags(postId: number, tag: any): Observable<any> {
    return this.http.post(`${this.url}/${postId}/addtags`, tag);
  }
  public enableComments(postId: number): Observable<any> {
    return this.http.patch(`${this.url}/${postId}/enablecomments`, {});
  }
  public disableComments(postId: number): Observable<any> {
    return this.http.patch(`${this.url}/${postId}/disablecomments`, {});
  }
  public getFilteredPosts(
    params: string,
    offset: number,
    length: number
  ): Observable<any> {
    return this.http.get(
      `${this.url}/all?status=${params}&offset=${offset}&length=${length}`
    );
  }
  public authorizedPosts(authorId:number):Observable<any> {
    return this.http.get(`${this.url}/${authorId}/authoredPosts`)
  }
  public totalViews(status:string):Observable<any>{
    return this.http.get(`${this.url}/totalviewcount?status=${status}`)

  }
}
