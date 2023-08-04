import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class categoryApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/Category';
  public getCategory(): Observable<any> {
    return this.http.get(this.url);
  }
  public postCategory(category: any): Observable<any> {
    return this.http.post(this.url, category);
  }
  public postSubcategory(subCategoryForm: any): Observable<any> {
    return this.http.post(
      `${this.url}/${subCategoryForm.categoryId}/subcategory`,
      subCategoryForm.subcategoryName
    );
  }
  public getSubcategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.url}/${categoryId}/subcategory`);
  }
}
