import { NgModule } from "@angular/core";
import { AuthorSharedModelComponent } from "./shared.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";

@NgModule({
    declarations: [AuthorSharedModelComponent],

    imports:[CommonModule,ReactiveFormsModule,MarkdownModule],
    exports:[AuthorSharedModelComponent]
})
export class AuthorSharedModule{}