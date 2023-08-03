import { AbstractControl, FormControl } from "@angular/forms";

export interface DynamicDIvElement{
    id:number;
    type:number;
    content:FormControl;
    dataURL?: string;
    sectionAttributes:any[];
}

