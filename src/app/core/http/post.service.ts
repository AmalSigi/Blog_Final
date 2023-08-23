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
  public getBlogPostById(postId: number): Observable<any> {

    return this.http.get(`${this.url}/blog/${postId}`);
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
    length: number,
    searchInput: string | undefined
  ): Observable<any> {
    let apiUrl = `${this.url}/all?status=${params}&offset=${offset}&length=${length}`;

    if (searchInput != undefined) {
      apiUrl += `&search=${searchInput}`;
    }
    return this.http.get(apiUrl);
  }
  public getFilteredCommentPosts(
    offset: number,
    length: number
  ): Observable<any> {
    return this.http.get(`${this.url}/all?offset=${offset}&length=${length}`);
  }
  public getLatestPosts(length: number): Observable<any> {
    return this.http.get(`${this.url}/blog/all?length=${length}`);
  }

  public getRecommendedPost(count: number, postId: number): Observable<any> {
    return this.http.get(`${this.url}/${postId}/getsuggestions?count=${count}`);
  }

  public getPostByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.url}/category/${categoryId}`);
  }

  public getPostBySubCategory(subcategory: number): Observable<any> {
    return this.http.get(`${this.url}/subcategory/${subcategory}`);
  }

  public getPostByCategoryByLength(
    categoryId: number,
    length: number
  ): Observable<any> {
    return this.http.get(`${this.url}/category/${categoryId}?length=${length}`);
  }
  public getPostBySubategoryByLength(
    subcategoryId: number,
    length: number
  ): Observable<any> {
    return this.http.get(
      `${this.url}/subcategory/${subcategoryId}?length=${length}`
    );
  }

  public authorizedPosts(authorId: number): Observable<any> {
    return this.http.get(`${this.url}/${authorId}/authoredPosts`);
  }
  public totalViews(status: string): Observable<any> {
    return this.http.get(`${this.url}/totalviewcount?status=${status}`);
  }
  public postHasComment(
    status: string,
    length: number,
    offset: number
  ): Observable<any> {
    return this.http.get(
      `${this.url}/hasComments?status=${status}&length=${length}&offset=${offset}`
    );
  }
}
