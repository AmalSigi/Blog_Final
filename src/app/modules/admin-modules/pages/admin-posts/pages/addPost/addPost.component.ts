import {
  Component,
  OnInit
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
  blogForm!: FormGroup;
  dynamicDiv: DynamicDIvElement[] = [];
  dynamicFormControls: FormControl[] = [];
  currentTool!: string;
  constructor(private formbuilder: FormBuilder) {}
  public dataUrl!: string;

  ngOnInit() {
    this.blogForm = this.formbuilder.group({
      heading: ['', Validators.required],
      dynamicFormArray: this.formbuilder.array([]),
    });
  }
  get dynamicFormArray(): FormArray {
    return this.blogForm.get('dynamicFormArray') as FormArray;
  }
  // Add a dynamic form control to the FormArray
  selectTool(type: string) {
    this.currentTool=type;
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

  // On Enter key press, handle form submission and get the data
  // public onEnterKeyPress(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();

  //     // Collect the data from the form
  //     const mainHeadingValue = this.blogForm.get('heading')?.value;
  //     const dynamicFormData = this.dynamicFormControls.map(
  //       (control) => control.value
  //     );

  //   }
  // }

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
}
