import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class themeApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/Theme';
  public getThemes():Observable<any>{
    return this.http.get(this.url)
  }
  public getThemeById(Id:number):Observable<any>{
    return this.http.get(`${this.url}/${Id}`)
  }
  public updateTheme(Id:number,body:any):Observable<any>{
    return this.http.patch(`${this.url}/${Id}/update`,body)
  }
}