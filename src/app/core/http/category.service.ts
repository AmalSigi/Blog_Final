import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class categoryApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/Category';
  // category
  public getCategory(): Observable<any> {
    return this.http.get(this.url);
  }

  public getCategoryById(categoryId: number): Observable<any> {
    return this.http.get(`${this.url}/${categoryId}`);
  }

  public postCategory(category: any): Observable<any> {
    return this.http.post(this.url, category);
  }

  // subcategory
  public postSubcategory(subCategoryForm: any): Observable<any> {
    return this.http.post(
      `${this.url}/${subCategoryForm.categoryId}/subcategory`,
      subCategoryForm.subcategoryName
    );
  }
  public getSubcategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.url}/${categoryId}/subcategory`);
  }
  public getSubcategoryById(subcategoryId: number): Observable<any> {
    return this.http.get(`${this.url}/subcategory/${subcategoryId}`);
  }

  // cover picture
  public postCategoryCoverPicture(
    categoryId: number,
    img: FormData
  ): Observable<any> {
    return this.http.patch(
      `${this.url}/${categoryId}/udpateCategoryCoverPicture`,
      img
    );
  }

  public deleteCat(catId: number): Observable<any> {
    return this.http.delete(`${this.url}/${catId}/delete`);
  }
  public deleteSubCat(subcatId: number): Observable<any> {
    return this.http.delete(`${this.url}/subcategory/${subcatId}/delete`);
  }
}
