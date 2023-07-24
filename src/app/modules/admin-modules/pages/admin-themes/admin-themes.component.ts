import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-admin-themes',
  templateUrl: './admin-themes.component.html',
})
export class AdminThemesComponent implements OnInit {
  public themes: any;
  constructor(
    private readonly http: HttpClient,
    private readonly themeData: postData
  ) {}
  ngOnInit(): void {
    this.getThemes();
  }

  public getThemes() {
    // this.http
    //   .get('')
    //   .subscribe((repo: any) => {
    //     this.themes = repo;
    //   });
    this.themes = this.themeData.Themes;

    console.log(this.themes);
  }
}
