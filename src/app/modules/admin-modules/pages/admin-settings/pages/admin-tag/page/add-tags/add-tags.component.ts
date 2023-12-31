import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { tagApi } from 'src/app/core/http/tag.service';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
})
export class AddTagsComponent implements OnInit {
  constructor(
    private readonly tagApi: tagApi,
    private readonly toster: ToastrService
  ) {}

  public newTagArray: any = [];

  public tagForm: FormGroup = new FormGroup({
    tagName: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  public postTag() {
    this.tagApi.addTag(this.newTagArray).subscribe({
      next: (respo: any) => {
        console.log(respo);
        this.toster.success(`New Tag is Added`);
        this.newTagArray = [];
    
      },
      error: () => {
      
      },
      complete: () => {},
    });
  }

  public addNewTagarray(addSub: any) {
    const subOj = { tagName: '#' + addSub };
    this.newTagArray?.push(subOj);
    this.tagForm.get('tagName')?.reset();
  }

  removeTag(id: number): void {
    this.newTagArray.splice(id, 1);
  }
}
