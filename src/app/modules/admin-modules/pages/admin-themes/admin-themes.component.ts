import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Themes } from 'src/app/shared/dummy data/dummy.themes';

@Component({
  selector: 'app-admin-themes',
  templateUrl: './admin-themes.component.html',
})
export class AdminThemesComponent implements OnInit {
  public themes: any;
  constructor(private readonly http: HttpClient) {}
  ngOnInit(): void {
    this.getThemes();
  }

  public getThemes() {
    // this.http
    //   .get('')
    //   .subscribe((repo: any) => {
    //     this.themes = repo;
    //   });
    this.themes = Themes;

    console.log(this.themes);
  }
}
