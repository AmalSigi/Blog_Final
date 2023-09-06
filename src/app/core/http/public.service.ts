import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  constructor(private readonly http: HttpClient) {}
  public url: string = `${environment.url}/Public`;

  // category
  public getCategory(): Observable<any> {
    return this.http.get(`${this.url}/Category`);
  }

  public getCategoryById(categoryId: number): Observable<any> {
    return this.http.get(`${this.url}/Category/${categoryId}`);
  }

  public getSubCategoryByCategoryId(categoryId: number): Observable<any> {
    return this.http.get(`${this.url}/Category/${categoryId}/subcategory`);
  }
  public getSubCategoryBySubCategoryId(subcategoryId: number): Observable<any> {
    return this.http.get(`${this.url}/Category/subcategory/${subcategoryId}`);
  }

  // comment

  public getCommentByCommentId(commentId: any): Observable<any> {
    return this.http.get(`${this.url}/Comment/${commentId}`);
  }

  public getCommentCountByPostId(postId: any): Observable<any> {
    return this.http.get(`${this.url}/Comment/${postId}/count`);
  }
  public getCommentsCount(postId: number, status: string): Observable<any> {
    return this.http.get(`${this.url}/${postId}/count?status=${status}`);
  }

  public getAllCommentByPostId(postId: any): Observable<any> {
    return this.http.get(`${this.url}/Comment/${postId}/all`);
  }

  public postComment(postId: number, comment: any): Observable<any> {
    return this.http.post(`${this.url}/Comment/new/${postId}`, comment);
  }
  public postGuestComment(postId: number, body: any): Observable<any> {
    return this.http.post(`${this.url}/Comment/newgustcomments/${postId}`, {
      body,
    });
  }

  public reportComment(commentId: number): Observable<any> {
    return this.http.patch(`${this.url}/Comment/${commentId}/report`, {});
  }

  // editors pick

  public getEditorsPick(): Observable<any> {
    return this.http.get(`${this.url}/EditorsPicks/picks`);
  }

  // post
  public getAllPost(): Observable<any> {
    return this.http.get(`${this.url}/Post/all`);
  }

  public getLatestPosts(length: number): Observable<any> {
    return this.http.get(`${this.url}/Post/all?length=${length}`);
  }

  public getPostByPostId(postId: number): Observable<any> {
    return this.http.get(`${this.url}/Post/${postId}`);
  }
  public getPostByAuthorId(authorId: number): Observable<any> {
    return this.http.get(`${this.url}/Post/${authorId}/authoredPosts`);
  }

  public getPostByCategoryId(categoryId: number): Observable<any> {
    return this.http.get(`${this.url}/Post/category/${categoryId}`);
  }

  public getPostByCategoryByLength(
    categoryId: number,
    length: number
  ): Observable<any> {
    return this.http.get(
      `${this.url}/Post/category/${categoryId}?length=${length}`
    );
  }

  public getPostBySubCategoryId(subcategoryId: number): Observable<any> {
    return this.http.get(`${this.url}/Post/subcategory/${subcategoryId}`);
  }

  public getPostBySubategoryByLength(
    subcategoryId: number,
    length: number
  ): Observable<any> {
    return this.http.get(
      `${this.url}/Post/subcategory/${subcategoryId}?length=${length}`
    );
  }

  public getPostSuggestionByPostId(postId: number): Observable<any> {
    return this.http.get(`${this.url}/Post/${postId}/getsuggestions`);
  }

  public getPostSuggestionByPostIdCount(
    count: number,
    postId: number
  ): Observable<any> {
    return this.http.get(
      `${this.url}/Post/${postId}/getsuggestions?count=${count}`
    );
  }

  // site setting

  public getSiteSetting(): Observable<any> {
    return this.http.get(`${this.url}/SiteSettings`);
  }

  // theme

  public getTheme(themeId: number): Observable<any> {
    return this.http.get(`${this.url}/Theme/${themeId}`);
  }

  public getThemeAdvertisements(): Observable<any> {
    return this.http.get(`${this.url}/Theme/advertisements`);
  }

  public getThemeRandomAdvertisements(): Observable<any> {
    console.log(this.url);
    return this.http.get(`${this.url}/Theme/randonAdvertisement`);
  }

  // login & Authentication & signup

  public postUserSignUp(body: any): Observable<any> {
    return this.http.post(`${this.url}/UserAccount/usersignup`, body);
  }

  // contact us

  public postContactUs(body: any): Observable<any> {
    return this.http.post(`${this.url}/ContactUs/newMessage`, body);
  }
}
