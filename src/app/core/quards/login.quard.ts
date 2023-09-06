import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class loginQuards {
  constructor(
    private readonly http: HttpClient,
    private readonly route: Router
  ) {}
  public url: string = `${environment.url}/Authentication/isAuthorized`;
  canActivate(): any {
    this.http.post(this.url, {}).subscribe({
      next: (resp) => {
        return true;
      },
      error: () => {
        this.route.navigate(['/login']);
        return false;
      },
    });
  }
}
