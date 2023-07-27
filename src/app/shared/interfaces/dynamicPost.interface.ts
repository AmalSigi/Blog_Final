import { AbstractControl, FormControl } from "@angular/forms";

export interface DynamicDIvElement{
    id:number;
    type:string;
    content:FormControl;
    dataURL?: string;
}