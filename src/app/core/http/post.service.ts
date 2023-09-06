import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
@Injectable({
  providedIn: 'root',
})
export class postsAPi {
  constructor(private readonly http: HttpClient) {}
  public url: string = `${environment.url}/Post`;

  // admin side
  public getPosts(): Observable<any> {
    return this.http.get(`${this.url}/testing/all`);
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
  public toggleComments(postId: number): Observable<any> {
    return this.http.patch(`${this.url}/${postId}/toggleCommentsOnOff`, {});
  }

  public getFilteredPosts(
    params: string,
    offset: number,
    length: number,
    searchInput: string | undefined
  ): Observable<any> {
    let apiUrl = `${this.url}/testing/all?status=${params}&offset=${offset}&length=${length}`;

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

  public getRecommendedPost(count: number, postId: number): Observable<any> {
    return this.http.get(`${this.url}/${postId}/getsuggestions?count=${count}`);
  }
  public getRecommendedPost2(postId: number): Observable<any> {
    return this.http.get(`${this.url}/${postId}/getsuggestions`);
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
  public ownPosts(
    status: string,
    length: number,
    offset: number
  ): Observable<any> {
    return this.http.get(
      `${this.url}/ownPosts?status=${status}&length=${length}&offset=${offset}`
    );
  }
  public allOwnPosts(): Observable<any> {
    return this.http.get(`${this.url}/ownPosts`);
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

  public postHasNewReported(length: number, offset: number): Observable<any> {
    return this.http.get(
      `${this.url}/recentReportedPosts?length=${length}&offset=${offset}`
    );
  }

  public AuthorpostHasComment(
    status: string,
    length: number,
    offset: number
  ): Observable<any> {
    return this.http.get(
      `${this.url}/autheredPostHasComments?status=${status}&length=${length}&offset=${offset}`
    );
  }
  public userPosts(
    authorId: number,
    status: string,
    length: number,
    offset: number
  ): Observable<any> {
    return this.http.get(
      `${this.url}/${authorId}/authoredPosts?status=${status}&length=${length}&offset=${offset}`
    );
  }
  public getUncategorizedPost(): Observable<any> {
    return this.http.get(`${this.url}/uncategorized`);
  }
  public getFilteredUncategorizedPost(
    params: string,
    offset: number,
    length: number,
    searchInput: string | undefined
  ): Observable<any> {
    let apiUrl = `${this.url}/uncategorized?status=${params}&offset=${offset}&length=${length}`;

    if (searchInput != undefined) {
      apiUrl += `&search=${searchInput}`;
    }
    return this.http.get(apiUrl);
  }

  public deletePostpermanently(postId: number): Observable<any> {
    return this.http.delete(`${this.url}/${postId}/deletePermanently`);
  }

  // user side
  public getBlogPostById(postId: number): Observable<any> {
    return this.http.get(`${this.url}/blog/${postId}`);
  }
  public getLatestPosts(length: number): Observable<any> {
    return this.http.get(`${this.url}/testing/blog/all?length=${length}`);
  }

  public getAuthored(authorId: any): Observable<any> {
    return this.http.get(`${this.url}/blog/${authorId}/authoredPosts`);
  }
}
