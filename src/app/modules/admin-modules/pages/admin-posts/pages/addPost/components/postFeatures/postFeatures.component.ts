import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-postFeatures',
  templateUrl: './postFeatures.component.html',
})
export class PostFeaturesComponent implements OnInit {
  constructor(private readonly postService: postData) {}
  public category!: any[];
  public tags!: any[];
  public selectedTags: any = [];
  public subCategory!: any[];
  public selectDropDown!: string;
  @ViewChild('Category') catagoryInput!: ElementRef;
  @ViewChild('subCatgory') subCatagoryInput!: ElementRef;
  @ViewChild('tags') tagsInput!: ElementRef;
  @Output() createPost=new EventEmitter();
  public featureForm: FormGroup=new FormGroup({
    author:new FormControl({value:'Robert',disabled:true},Validators.required),
    category: new FormControl({value:'',disabled:true},Validators.required),
    subCategory: new FormControl({value:'',disabled:true},Validators.required),
   
  
  })
  ngOnInit(): void {
    this.category = this.postService.categories;
  }
  public changeCategory(index: number): void {
    this.featureForm.controls['category'].patchValue(this.category[index - 1].category);
    this.subCategory = this.category[index - 1].subCategories;
    this.selectDropDown = '';
  }
  public changeSubCategory(index: number): void {
    const location = this.subCategory.findIndex((i) => i.id == index);
    this.featureForm.controls['subCategory'].patchValue(this.subCategory[location].subCategory);
      
    this.selectDropDown = '';
  }
  onInputChange(event: any): void {
    this.tags = this.postService.tags.filter((tag) =>
      tag.tag.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }
  addTag(tag: string): void {
    this.selectedTags?.push(tag);
  }
  removeTag(id:number): void {
    console.log(id)
    this.selectedTags.splice(id, 1);
   
  }
  ToOpenCreatePage(){

    this.createPost.emit(this.featureForm.value);
    console.log(this.featureForm.value)
  }

}
