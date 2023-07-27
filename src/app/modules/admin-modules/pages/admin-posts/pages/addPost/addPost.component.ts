import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDIvElement } from 'src/app/shared/interfaces/dynamicPost.interface';

@Component({
  selector: 'app-addPost',
  templateUrl: './addPost.component.html',
})
export class AddPostComponent implements OnInit {
  public form!: FormGroup;
  public newVal!: any;
  constructor(
    private readonly renderer: Renderer2,
    private readonly formbuilder: FormBuilder
  ) {}
  public dynamicDiv: DynamicDIvElement[] = [];
  public currentTool!: string;
  public blogContent!: any[];

  @ViewChild('textarea') contentContainer!: ElementRef;
  public blogForm: FormGroup = new FormGroup({
    heading: new FormControl('', Validators.required),
    // blog: new FormArray([], Validators.required),
    content: new FormControl('', Validators.required),
  });
  public blogForm1: FormGroup = new FormGroup({
    heading: new FormControl('', Validators.required),
    blog: new FormArray([], Validators.required),
    // content: new FormControl('', Validators.required),
  });
  get blogFormArray(): FormArray {
    return this.blogForm1.get('blog') as FormArray;
  }
  ngOnInit(): void {}

  public onEnterKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      // this.selectTool('paragraph');
      // console.log(this.blogForm.value);
    }
  }
  // Adding html elements
  // public selectTool(type: string): void {
  //   const contentBlock = this.renderer.createElement('div');
  //   contentBlock.classList.add('content-block');
  //   let inputElement: any;
  //   switch (type) {
  //     case 'paragraph':
  //       this.currentTool = 'paragraph';
  //       inputElement = this.renderer.createElement('textarea');
  //       this.renderer.setAttribute(inputElement, 'cols', '50');
  //       this.renderer.setAttribute(
  //         inputElement,
  //         'formControlName',
  //         'paragraph'
  //       );
  //       this.renderer.setAttribute(
  //         inputElement,
  //         'placeholder',
  //         'Enter the paragraph'
  //       );

  //       break;
  //     case 'heading':
  //       this.currentTool = 'heading';
  //       inputElement = this.renderer.createElement('input');
  //       this.renderer.setAttribute(inputElement, 'type', 'text');
  //       this.renderer.setAttribute(
  //         inputElement,
  //         'formControlName',
  //         'paragraph'
  //       );

  //       this.renderer.setStyle(inputElement, 'font-size', '30px');
  //       this.renderer.setAttribute(
  //         inputElement,
  //         'placeholder',
  //         'Enter the Title'
  //       );

  //       break;
  //     case 'image':
  //       this.currentTool = 'image';
  //       inputElement = this.renderer.createElement('div');
  //       inputElement.classList.add('media-box');
  //       const mediaBox = this.renderer.createElement('input');
  //       this.renderer.setAttribute(mediaBox, 'type', 'file');
  //       this.renderer.setAttribute(mediaBox, 'placeholder', 'upload image');
  //       inputElement.appendChild(mediaBox);

  //       break;
  //     case 'video':
  //       this.currentTool = 'video';
  //       inputElement = this.renderer.createElement('input');
  //       this.renderer.setAttribute(inputElement, 'type', 'file');
  //       this.renderer.setAttribute(inputElement, 'placeholder', 'upload video');
  //       break;
  //     default:
  //       break;
  //   }
  //   inputElement.setAttribute('ng-content', '');
  //   this.renderer.appendChild(contentBlock, inputElement);
  //   this.renderer.appendChild(
  //     this.contentContainer.nativeElement,
  //     contentBlock
  //   );

  //   const formControl: any = this.blogForm.get('blog');
  //   inputElement?.addEventListener('input', (event: any) => {
  //     this.newVal = event.target.value;
  //   });
  //   console.log(this.newVal);

  //   const form = new FormGroup({
  //     type: new FormControl(this.currentTool),
  //     content: new FormControl(this.newVal),
  //   });
  //   if (this.newVal != null) {
  //     this.blogFormArray.push(form);
  //   }
  // }
  public selectTool(type: string) {
    this.currentTool = type;
    let counter: number = 1;
    const dynamicFormGroup = this.formbuilder.group({
      type,
      content: this.blogForm.controls['content'].value,
    });
    this.blogFormArray.push(dynamicFormGroup);

    const dynamicElement: DynamicDIvElement = {
      id: counter + 1,
      type,
      content: this.blogForm.controls['content'].value,
    };

    this.dynamicDiv.push(dynamicElement);
    console.log(this.dynamicDiv);
  }
  public publishPost() {
    this.blogForm1.controls['heading']?.setValue(
      this.blogForm.controls['heading'].value
    );

    console.log(this.blogForm1.value);
  }
}
