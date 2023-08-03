import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addPostSettings',
  templateUrl: './addPostSettings.component.html',
})
export class AddPostSettingsComponent {
@Input() height!: string;
@Input() width!: string;
@Input() aspectRatio!: string;
@Input() objectFit!:string;
@Output() onChange=new EventEmitter();
public imgForm!: FormGroup;
public images!: any;
constructor(private readonly http: HttpClient) {}
@Output() sendURL=new EventEmitter();

ngOnInit() {
  this.http.get('http://192.168.29.97:5296/Media').subscribe((data) => {
    console.log(data);
    this.images=data;
  });
  this.imgForm=new FormGroup({
    height:new FormControl(Number(this.height)),
    objectFit:new FormControl(this.objectFit),
    width:new FormControl(Number(this.width)),
    aspectRatio:new FormControl(this.aspectRatio)
  })
}
  
  changeHeight(event:any):void{
    console.log(this.imgForm.value)
    this.onChange.emit(this.imgForm.value);
  }
  public sendImage(image:string):void {
    this.sendURL.emit(image);
  
  }
}


