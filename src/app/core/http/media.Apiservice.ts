import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaApi {
  constructor(private http: HttpClient) {}

  public url = 'http://192.168.29.97:5296/api/Media';

  public fetchImage(): Observable<any> {
    return this.http.get(`${this.url}/Advertisement_Image`);
  }

  public fetchVideo(): Observable<any> {
    return this.http.get(`${this.url}/Advertisement_Video`);
  }

  public fetchExternal(): Observable<any> {
    return this.http.get(`${this.url}/External`);
  }
}
