import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class tagApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = `${environment.url}/Tags`;
  public getTags(
    offset: number,
    length: number,
    searchInput: string | undefined
  ): Observable<any> {
    let apiUrl = `${this.url}/all?offset=${offset}&length=${length}`;
    console.log(searchInput);
    if (searchInput != undefined) {
      apiUrl += `&search=%23${searchInput}`;
    }
    console.log(apiUrl);
    return this.http.get(apiUrl);
  }
  public getAllTags(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }
  public postTags(body: string): Observable<any> {
    return this.http.post(this.url, body);
  }
  public getTagsById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
  public addTag(tag: any): Observable<any> {
    return this.http.post(`${this.url}`, tag);
  }
  public getTagById(tagId: number): Observable<any> {
    return this.http.get(`${this.url}/${tagId}`);
  }
  public deletTag(tagId: number): Observable<any> {
    return this.http.delete(`${this.url}/${tagId}/delete`);
  }
}
