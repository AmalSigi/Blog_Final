import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { postData } from 'src/app/core/services/posts.services';
import { DynamicDIvElement } from 'src/app/shared/interfaces/dynamicPost.interface';

@Component({
  selector: 'app-addPost',
  templateUrl: './addPost.component.html',
})
export class AddPostComponent implements OnInit {
  blogForm!: FormGroup;
  public postFeatures: boolean = true;
  dynamicDiv: DynamicDIvElement[] = [];
  dynamicFormControls: FormControl[] = [];
  currentTool!: string;
  public imgHeight!: string;
  public imgWidth!: string;
  constructor(
    private formbuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly data: postData,
    private readonly http:HttpClient
  ) {}
  public dataUrl!: string;

  ngOnInit() {
    this.blogForm = this.formbuilder.group({
      heading: ['', Validators.required],
      dynamicFormArray: this.formbuilder.array([]),
    });
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      if (params['post']) {
        const id = params['post'];
        console.log(id);
        const index = this.data.postData.findIndex((post) => post.id == id);
        const postData = this.data.postData[index];
        console.log(postData);
        this.editTool(postData);
      }
    });
  }
  get dynamicFormArray(): FormArray {
    return this.blogForm.get('dynamicFormArray') as FormArray;
  }
  // Add a dynamic form control to the FormArray
  selectTool(type: string) {
    this.currentTool = type;
    switch (type) {
      case 'subHeading':
        this.dynamicFormControls.push(this.formbuilder.control(''));
        break;
      case 'paragraph':
        this.dynamicFormControls.push(this.formbuilder.control(''));
        break;
      case 'image':
        this.dynamicFormControls.push(this.formbuilder.control(null));
        break;
      case 'video':
        this.dynamicFormControls.push(this.formbuilder.control(null));
        break;
      default:
        break;
    }

    const dynamicElement: DynamicDIvElement = {
      id: this.dynamicFormControls.length,
      type,
      content: this.dynamicFormControls[this.dynamicFormControls.length - 1],
    };

    this.dynamicDiv.push(dynamicElement);

    console.log(this.dynamicDiv);
  }
  public editTool(data: any): void {
    console.log(data);
    this.blogForm.controls['heading'].setValue(data.heading);
    data?.dynamicFormArray.forEach((element: any) => {
      switch (element.type) {
        case 'subHeading':
          this.dynamicFormControls.push(
            this.formbuilder.control(element.content)
          );
          break;
        case 'paragraph':
          this.dynamicFormControls.push(
            this.formbuilder.control(element.content)
          );
          break;
        case 'image':
          this.dynamicFormControls.push(
            this.formbuilder.control(element.content)
          );
          break;
        case 'video':
          this.dynamicFormControls.push(
            this.formbuilder.control(element.content)
          );
          break;
        default:
          break;
      }
      const dynamicElement: DynamicDIvElement = {
        id: this.dynamicFormControls.length,
        type: element.type,
        content: this.dynamicFormControls[this.dynamicFormControls.length - 1],
      };

      this.dynamicDiv.push(dynamicElement);
    });
  }

  // File input change event for image
  onFileSelected(event: any) {
    const selectedFile = event.target.files.item(0);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const imgPrev = reader.result as string;

      const lastIndex = this.dynamicDiv.length - 1;
      this.dynamicDiv[lastIndex].dataURL = imgPrev;
    };
  }

  publish() {
    this.dynamicDiv.forEach((element) => {
      const formGroup = this.formbuilder.group({
        id: element.id,
        type: element.type,
        content: element.content,
        dataURL: element.dataURL,
      });
      this.dynamicFormArray.push(formGroup);
    });
    console.log(this.blogForm);
  }
  getPostFeatures(event: any): void {
    console.log(event);
    this.postFeatures = false;
  }
  changeImageSize(event: any) {
    this.imgHeight = event.toString();
    console.log(this.imgHeight);
  }
  
}
