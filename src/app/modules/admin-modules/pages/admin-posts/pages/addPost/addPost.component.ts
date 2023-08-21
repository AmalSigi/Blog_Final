import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { postsAPi } from 'src/app/core/http/post.service';
import { DynamicDIvElement } from 'src/app/shared/interfaces/dynamicPost.interface';

@Component({
  selector: 'app-addPost',
  templateUrl: './addPost.component.html',
})
export class AddPostComponent implements OnInit {
  blogForm!: FormGroup;
  public postFeatures: boolean = true;
  public loading: boolean = false;
  dynamicDiv: DynamicDIvElement[] = [];
  dynamicFormControls: FormControl[] = [];
  currentTool!: number;
  public imgHeight: string = '600';
  public imgWidth: string = '600';
  public aspectRatio: string = 'auto';
  public objectFit: string = 'fill';
  public sectionId: number = 0;
  public mediaFilePath: string = 'http://192.168.29.97:5296/assets/';
  public mediaToolBar: boolean = false;
  public TextToolBar: boolean = true;
  constructor(
    private formbuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
    private readonly postService: postsAPi,
    private readonly router: Router
  ) {}
  public dataUrl!: string;
  public postId!: number;

  ngOnInit() {
    this.blogForm = this.formbuilder.group({
      authorId: new FormControl(),
      categoryId: new FormControl(),
      subCategoryId: new FormControl(),
      postTags: this.formbuilder.array([]),
      postSections: this.formbuilder.array([]),
    });

    this.route.queryParams.subscribe((params: any) => {
      this.loading=true;
      if (params['postId']) {
        this.postId = params['postId'];
        this.postService.getPostById(this.postId).subscribe({
          next: (data) => {
            this.loading = false;
            const postData = data;
            this.editTool(postData);
          },
        });
      } else {
        this.dynamicFormControls.push(this.formbuilder.control(''));
        this.createFormData(1);
      }
    });
  }
  get dynamicFormArray(): FormArray {
    return this.blogForm.get('postSections') as FormArray;
  }
  get dynamicTags(): FormArray {
    return this.blogForm.get('postTags') as FormArray;
  }
  //dynamic form control to the FormArray
  selectTool(type: number) {
    if (type == 4 || type == 5) {
      this.mediaToolBar = true;
    } else {
      this.mediaToolBar = false;
    }

    this.currentTool = type;
    this.sectionId++;
    this.dynamicFormControls.push(this.formbuilder.control(''));
    this.createFormData(type);
  }
  public createFormData(type: number) {
    const dynamicElement: DynamicDIvElement = {
      id: this.dynamicFormControls.length,
      type,
      content: this.dynamicFormControls[this.dynamicFormControls.length - 1],
      sectionAttributes: [],
    };

    this.dynamicDiv.push(dynamicElement);
  }
  public editTool(data: any): void {
    this.sectionId++;
    data.postSections.forEach((element: any) => {
      switch (element.sectionTypeId) {
        case 4 || 5:
          this.dynamicFormControls.push(this.formbuilder.control(''));

          break;

        default:
          this.dynamicFormControls.push(
            this.formbuilder.control(element.content)
          );

          break;
      }
      const dynamicElement: DynamicDIvElement = {
        id: this.dynamicFormControls.length,
        type: element.sectionTypeId,
        content: this.dynamicFormControls[this.dynamicFormControls.length - 1],
        sectionAttributes: [],
      };
      if (element.sectionTypeId == 4 || element.sectionTypeId == 5) {
        dynamicElement.dataURL = element.content;
      }

      this.dynamicDiv.push(dynamicElement);
    });
  }

  // File input change event for image
  onFileSelected(event: any) {
    const selectedFile = event.target.files.item(0);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    const formData = new FormData();
    interface ServerResponse {
      mediaPath: string;
    }
    formData.append('file', selectedFile, selectedFile.name);
    this.http
      .post<ServerResponse>('http://192.168.29.97:5296/Media', formData)
      .subscribe({
        next: (res) => {
          this.dynamicDiv[this.sectionId].dataURL = res.mediaPath;
        },
      });

    // this.dynamicFormControls[this.sectionId].setValue(formData);
  }

  public publish() {
    this.dynamicDiv.forEach((element) => {
      const formGroup = this.formbuilder.group({
        sectionTypeId: element.type,
        content: element.dataURL ? element.dataURL : element.content,
        sequenceNo: element.id,
      });
      this.dynamicFormArray.push(formGroup);
    });
    if (this.postId == null) {
      this.postService.addPost(this.blogForm.value).subscribe({
        next: (res) => {
          alert('New post created..')

          this.router.navigate(['/posts/published']);
        },
        error: (err) => {
          alert('Error please try again..')
        },
      });
    }

    if (this.postId != null) {
      this.postService.editPost(this.postId, this.blogForm.value).subscribe({
        next: (response) => {
          alert('Post updated successfully')

          this.router.navigate(['/posts']);
        },
        error: (response) => {
          alert(response.error+ ", Please try again...")
        }
      });
    }
  }
  getPostFeatures(event: any): void {
    // this.postFeatures = false;
    this.blogForm.controls['categoryId']?.setValue(event.categoryId);
    this.blogForm.controls['subCategoryId']?.setValue(event.subCategoryId);
    this.blogForm.controls['authorId']?.setValue(event.authorId);
    event.tags.forEach((tag: any) => {
      const postTags = new FormGroup({
        tagId: new FormControl(tag.id),
      });
      this.dynamicTags.push(postTags);
    });
  }
  public closeModal() {
    this.mediaToolBar = false;
  }

  Selected(id: number, type: number) {
    this.currentTool = type;
    this.sectionId = id;
    if (type == 4 || type == 5) {
      this.mediaToolBar = true;
    } else {
      this.mediaToolBar = false;
    }
  }
  public setImageUrl(url: any) {
    this.dynamicDiv[this.sectionId].dataURL = url;
    this.mediaToolBar = false;
  }
  addBlock(type: number) {
    console.log(type);
    if (type == 4 || type == 5) {
      this.mediaToolBar = true;
    } else {
      this.mediaToolBar = false;
    }
    this.dynamicFormControls.splice(
      this.sectionId + 1,
      0,
      this.formbuilder.control('')
    );

    const dynamicElement: DynamicDIvElement = {
      id: this.sectionId + 2,
      type: type,
      content: this.dynamicFormControls[this.sectionId + 1],
      sectionAttributes: [],
    };

    this.dynamicDiv.splice(this.sectionId + 1, 0, dynamicElement);
    this.setId();
  }
  //delete block
  public deleteBlock() {
    this.dynamicFormControls.splice(this.sectionId, 1);

    this.dynamicDiv.splice(this.sectionId, 1);
    this.setId();
  }
  public setId() {
    for (let i = 0; i < this.dynamicDiv.length; i++) {
      this.dynamicDiv[i].id = i + 1;
    }
  }

  private selectionStart!: number;
  private selectionEnd!: number;
  public selectedTextarea!: string;
  getSelectedWord(event: any) {
    const textarea: any = event.target;
    this.TextToolBar = true;
    if (
      textarea.selectionStart !== undefined &&
      textarea.selectionEnd !== undefined
    ) {
      this.selectionStart = event.target.selectionStart;
      this.selectionEnd = event.target.selectionEnd;

      const selectedText = textarea.value.substring(
        this.selectionStart,
        this.selectionEnd
      );
      this.selectedTextarea = selectedText;
    }
  }
  public urlData!: string;
  public getUrl(Url: string): void {
    this.urlData = Url;
    this.onTextSelected('link');
  }
  public onTextSelected(event: any): void {
    let formattedText: string = '';
    if (this.selectedTextarea) {
      switch (event) {
        case 'bold':
          formattedText = `**${this.selectedTextarea}**`;
          break;
        case 'italic':
          formattedText = `*${this.selectedTextarea}*`;
          break;
        case 'link':
          formattedText = `[${this.selectedTextarea}](${this.urlData})`;
          break;
        default:
          break;
      }
      const textarea = this.dynamicFormControls[this.sectionId].value;
      const newText =
        textarea.slice(0, this.selectionStart) +
        formattedText +
        textarea.slice(this.selectionEnd);
      this.dynamicFormControls[this.sectionId].setValue(newText);
    }
    this.selectedTextarea = '';
  }
}
