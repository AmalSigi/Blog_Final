import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class tagApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/Tags';
  public getTags(offset: number, length: number): Observable<any> {
    return this.http.get(`${this.url}/all?offset=${offset}&length=${length}`);
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
}
