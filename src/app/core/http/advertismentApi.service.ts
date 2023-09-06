import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  constructor(private readonly http: HttpClient) {}

  private selectedZoneSubject = new BehaviorSubject<number | null>(null);

  public url: string = `${environment.url}/Theme`;

  getSelectedZone(): Observable<number | null> {
    return this.selectedZoneSubject.asObservable();
  }

public getAdvertisement(): Observable<any>{
  return this.http.get(`${environment.url}/public/Theme/advertisements`)
}
  setSelectedZone(zone: number): void {
    this.selectedZoneSubject.next(zone);
  }

  public fetchThemeById(themeId: number): Observable<any> {
    return this.http.get(`${this.url}/${themeId}`);
  }

  public getDynamicList(): Observable<any> {
    return this.http.get(`${this.url}/dynamicAdvertisementList`);
  }

  public deleteDynamic(listId: number): Observable<any> {
    return this.http.delete(`${this.url}/dynamicList/${listId}/delete`);
  }

  public addNewMedia(mediaFormat: string, formData: FormData): Observable<any> {
    return this.http.post(
      `${this.url}/dynamicList/newMedia/${mediaFormat}`,
      formData
    );
  }

  public addLink(formData: any): Observable<any> {
    return this.http.post(`${this.url}/dynamicList/new/externalLink`, formData);
  }

  public addExistingMedia(formData: any): Observable<any> {
    return this.http.post(`${this.url}/dynamicList/existingMedia`, formData);
  }

  public addExistingLink(formData: any): Observable<any> {
    return this.http.post(`${this.url}/dynamicList/new/externalLink`, {
      formData,
    });
  }

  public apiUrl = `${this.url}/advertisements`;

  public postStaticAdvComputer(
    advertisementNo: number,
    mediaFormat: string,
    formData: FormData
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${advertisementNo}/static/newMedia/${mediaFormat}`,
      formData
    );
  }

  public postStaticExternalComputer(
    advertisementNo: number,
    formData: any
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${advertisementNo}/external/new`,
      formData
    );
  }

  public uploadExistingMedia(
    advertisementNo: number,
    formData: any
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${advertisementNo}/static/existingMedia`,
      formData
    );
  }

  public uploadExistingLink(
    advertisementNo: number,
    formData: any
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${advertisementNo}/external/existingLink`,
      formData
    );
  }

  public uploadDynamic(advertisementNo: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${advertisementNo}/dynamic`, {});
  }

  public disableAds(advertisementNo: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${advertisementNo}/disable`, {});
  }
}
