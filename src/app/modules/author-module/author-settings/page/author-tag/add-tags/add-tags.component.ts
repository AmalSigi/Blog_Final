import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tagApi } from 'src/app/core/http/tag.service';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
})
export class AuthorAddTagsComponent implements OnInit {
  constructor(private readonly tagApi: tagApi) {}

  public newTagArray: any = [];

  public tagForm: FormGroup = new FormGroup({
    tagName: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  public postTag() {
    console.log(JSON.stringify(this.newTagArray));
    this.tagApi.addTag(this.newTagArray).subscribe((respo) => {
      console.log(respo);
    });
  }

  public addNewTagarray(addSub: any) {
    const subOj = { tagName: '#' + addSub };
    this.newTagArray?.push(subOj);
    this.tagForm.get('tagName')?.reset();
  }

  removeTag(id: number): void {
    console.log(id);
    this.newTagArray.splice(id, 1);
  }
}
