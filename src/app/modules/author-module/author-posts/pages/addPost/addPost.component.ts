import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { postsAPi } from 'src/app/core/http/post.service';
import { DynamicDIvElement } from 'src/app/shared/interfaces/dynamicPost.interface';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-addPost',
  templateUrl: './addPost.component.html',
})
export class AuthorAddPostComponent implements OnInit {
  blogForm!: FormGroup;
  public postFeatures: boolean = true;
  public loading: boolean = false;
  dynamicDiv: DynamicDIvElement[] = [];
  dynamicFormControls: FormControl[] = [];
  currentTool!: number;
  public imgHeight: string = '600';
  public imgWidth: string = '600';
  public aspectRatio: string = '';
  public objectFit: string = 'fill';
  public sectionId: number = 0;
  public postFont: string = '';
  public load: boolean = false;
  public mediaFilePath: string = `${environment.url}/assets/`;
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
  public sectionAttributes: any = [
    { sectionAttributeId: 1, value: '' },
    { sectionAttributeId: 2, value: '' },
    { sectionAttributeId: 3, value: '' },
    { sectionAttributeId: 4, value: '' },
    { sectionAttributeId: 5, value: '' },
    { sectionAttributeId: 6, value: '' },
    { sectionAttributeId: 7, value: '' },
    { sectionAttributeId: 8, value: '' },
    { sectionAttributeId: 9, value: '' },
  ];

  ngOnInit() {
    this.blogForm = this.formbuilder.group({
      authorId: new FormControl(),
      categoryId: new FormControl(),
      subCategoryId: new FormControl(),
      postFont: new FormControl(),
      postTags: this.formbuilder.array([]),
      postSections: this.formbuilder.array([]),
    });

    // draft post
    const draftData = localStorage.getItem('draftPost');
    if (draftData) {
      if (
        confirm(
          'You have an unfinished post. Do you want to continue with the unfinished post?'
        )
      ) {
        const draftPost = JSON.parse(draftData);
        this.editTool(draftPost);
      } else {
        localStorage.removeItem('draftPost');
        this.createForm();
      }
    } else {
      this.createForm();
    }
  }
  public createForm() {
    //edit post
    this.route.queryParams.subscribe((params: any) => {
      this.loading = true;
      if (params['postId']) {
        this.postId = params['postId'];
        this.postService.OwnPostsById(this.postId).subscribe({
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
    this.sectionId = this.dynamicDiv.length;
    this.dynamicFormControls.push(this.formbuilder.control(''));
    this.createFormData(type);
  }
  public createFormData(type: number) {
    const dynamicElement: DynamicDIvElement = {
      id: this.dynamicFormControls.length,
      type,
      content: this.dynamicFormControls[this.dynamicFormControls.length - 1],
      sectionAttributes: [
        { sectionAttributeId: 1, value: '' },
        { sectionAttributeId: 2, value: '' },
        { sectionAttributeId: 3, value: '' },
        { sectionAttributeId: 4, value: '' },
        { sectionAttributeId: 5, value: '' },
        { sectionAttributeId: 6, value: '' },
        { sectionAttributeId: 7, value: '' },
        { sectionAttributeId: 8, value: '' },
        { sectionAttributeId: 9, value: '' },
      ],
    };

    this.dynamicDiv.push(dynamicElement);
  }
  public editTool(data: any): void {
    this.sectionId++;
    data.postSections.forEach((element: any) => {
      this.sectionAttributes.forEach((attribute: any) => {
        const matchItem = element.sectionAttributes.find(
          (item: any) => item.sectionAttributeId == attribute.sectionAttributeId
        );
        if (!matchItem) {
          element.sectionAttributes.push(attribute);
        }
        element.sectionAttributes.sort(
          (a: any, b: any) => a.sectionAttributeId < b.sectionAttributeId
        );
      });
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
        sectionAttributes: element.sectionAttributes,
      };
      if (
        element.sectionTypeId == 4 ||
        element.sectionTypeId == 5 ||
        element.sectionTypeId == 6
      ) {
        dynamicElement.dataURL = element.content;
      }

      this.dynamicDiv.push(dynamicElement);
    });
  }

  // File input change event for image
  public mediaFormat!: string;
  onFileSelected(event: any) {
    const selectedFile = event.target.files.item(0);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    const formData = new FormData();
    interface ServerResponse {
      mediaPath: string;
    }
    formData.append('file', selectedFile, selectedFile.name);

    switch (this.currentTool) {
      case 4:
        this.mediaFormat = 'Image';
        break;
      case 5:
        this.mediaFormat = 'Video';
        break;
      case 6:
        this.mediaFormat = 'Advertisement_Image';
        break;
    }
    this.http
      .post<ServerResponse>(
        `${environment.url}/Media/${this.mediaFormat}`,
        formData
      )
      .subscribe({
        next: (res) => {
          this.dynamicDiv[this.sectionId].dataURL = res.mediaPath;
        },
      });

    // this.dynamicFormControls[this.sectionId].setValue(formData);
  }

  public publish() {
    this.load=true;
    this.dynamicDiv.forEach((element) => {
      element.sectionAttributes = element.sectionAttributes.filter(
        (item: any) => {
          return item.value !== '';
        }
      );
      const formGroup = this.formbuilder.group({
        sectionTypeId: element.type,
        content: element.dataURL ? element.dataURL : element.content,
        sequenceNo: element.id,
        sectionAttributes: this.formbuilder.array(element.sectionAttributes),
      });
      this.dynamicFormArray.push(formGroup);
    });
    if (this.postId == null) {
      this.postService.addPost(this.blogForm.value).subscribe({
        next: (res) => {
          this.load=false;
          alert('New post created..');

          this.router.navigate(['/author/posts/published']);
        },
        error: (err) => {
          this.load=false;

          const item=this.dynamicFormArray.at(0).value;
          if(item.content==''){
            alert('Blog title field is required..')
          }
          else{
            alert('Error please try again..');

          }
          while (this.dynamicFormArray.length !== 0) {
            this.dynamicFormArray.removeAt(0);
          }
          const draftPost = JSON.stringify(this.blogForm.value);
          localStorage.setItem('draftPost', draftPost);
          this.load=false;
        },
      });
    }

    if (this.postId != null) {
      this.postService.editPost(this.postId, this.blogForm.value).subscribe({
        next: (response) => {
          this.load=false;

          alert('Post updated successfully');

          this.router.navigate(['/author/posts/published']);
        },
        error: (response) => {
          this.load=false;
          alert(response.error + ', Please try again...');
        },
      });
    }
  }
  getPostFeatures(value: any): void {
    this.blogForm.controls['categoryId']?.setValue(value.categoryId);
    this.blogForm.controls['subCategoryId']?.setValue(value.subCategoryId);
    this.blogForm.controls['authorId']?.setValue(value.authorId);
    this.blogForm.controls['postFont']?.setValue(value.font);
    this.postFont = value.font;
    value.tags.forEach((tag: any) => {
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
    if (type == 4 || type == 5 || type == 6 || type == 7 || type == 8) {
      this.mediaToolBar = true;
    } else {
      this.mediaToolBar = false;
    }
  }
  public setImageUrl(url: any) {
    this.dynamicDiv[this.sectionId].dataURL = url;
  }
  addBlock(type: number) {
    this.currentTool = type;
    if (type == 4 || type == 5 || type == 6) {
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
      sectionAttributes: [
        { sectionAttributeId: 1, value: '' },
        { sectionAttributeId: 2, value: '' },
        { sectionAttributeId: 3, value: '' },
        { sectionAttributeId: 4, value: '' },
        { sectionAttributeId: 5, value: '' },
        { sectionAttributeId: 6, value: '' },
        { sectionAttributeId: 7, value: '' },
        { sectionAttributeId: 8, value: '' },
        { sectionAttributeId: 9, value: '' },
      ],
    };

    this.dynamicDiv.splice(this.sectionId + 1, 0, dynamicElement);
    this.setId();
    this.sectionId++;
  }
  //delete block
  public deleteBlock() {
    this.dynamicFormControls.splice(this.sectionId, 1);

    this.dynamicDiv.splice(this.sectionId, 1);
    this.setId();
    this.currentTool = 0;
    this.sectionId--;
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
  editorConfig = {
    base_url: '/tinymce',
    promotion: false,
    suffix: '.min',
    removed_menuitems: 'undo redo',
    menubar: 'insert',
    menu: {
      insert: { title: 'Insert', items: 'link' },
    },
    plugins: 'lists link wordcount fonts',
    toolbar:
      'undo redo | bold italic backcolor | \
  bullist numlist checklist outdent indent | removeformat fontfamily',
  };
  public changeFont(font: string) {
    this.blogForm.controls['postFont']?.setValue(font);
    this.postFont = font;
  }
  //find index position of section Attribute
  public findIndex(id: number, sectionId: number) {
    const index = this.dynamicDiv[sectionId].sectionAttributes.findIndex(
      (item: any) => item.sectionAttributeId == id
    );
    return index;
  }
  //image Settings
  public changeImgSetings(value: any) {
    this.dynamicDiv[this.sectionId].sectionAttributes[
      this.findIndex(1, this.sectionId)
    ].value = `${JSON.stringify(value.height)}`;
    this.dynamicDiv[this.sectionId].sectionAttributes[
      this.findIndex(2, this.sectionId)
    ].value = `${JSON.stringify(value.width)}`;
    this.dynamicDiv[this.sectionId].sectionAttributes[
      this.findIndex(4, this.sectionId)
    ].value = value.href;
    this.dynamicDiv[this.sectionId].sectionAttributes[
      this.findIndex(5, this.sectionId)
    ].value = value.altText;
    this.dynamicDiv[this.sectionId].sectionAttributes[
      this.findIndex(6, this.sectionId)
    ].value = value.aspectRatio;
    this.dynamicDiv[this.sectionId].sectionAttributes[
      this.findIndex(7, this.sectionId)
    ].value = value.objectFit;
    this.dynamicDiv[this.sectionId].sectionAttributes[
      this.findIndex(8, this.sectionId)
    ].value = value.font;
  }
  // Setting Ad type
  public chooseAdType(type: number) {
    this.currentTool = type;
    this.dynamicDiv[this.sectionId].type = type;
    if (type == 8) {
      this.dynamicDiv[this.sectionId].sectionAttributes[
        this.findIndex(9, this.sectionId)
      ].value = 'External';
    } else if (type == 9) {
      this.dynamicDiv[this.sectionId].content = new FormControl('NaN');
      this.dynamicDiv[this.sectionId].sectionAttributes[
        this.findIndex(9, this.sectionId)
      ].value = 'Dynamic';
    } else {
      this.dynamicDiv[this.sectionId].sectionAttributes[
        this.findIndex(9, this.sectionId)
      ].value = 'Static';
    }
  }
  public getImageStyle(height: string, width: string) {
    if (height == 'null' || (0 && width == 'null') || 0) {
      return {}; // Empty object to reset styles
    } else {
      return {
        height: `${height}px`,
        width: `${width}px`,
      };
    }
  }
}
