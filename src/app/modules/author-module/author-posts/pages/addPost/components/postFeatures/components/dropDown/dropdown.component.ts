import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "author-dropdown",
    templateUrl: "./dropdown.component.html",
    
})
export class AuthorDropdownComponent implements OnInit {
    constructor(){}
    @Input() category!:any[];
    ngOnInit(): void {
        console.log(this.category);
        
    }
    @Output() onChange = new EventEmitter();
    public changeCategory(index: number): void {
        this.onChange.emit(index);
}
}