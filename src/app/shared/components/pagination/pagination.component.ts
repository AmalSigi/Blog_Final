import { Component, EventEmitter, Input ,OnInit, Output} from "@angular/core";
import { OffsetService } from "src/app/core/services/pagination.service";

@Component({
    selector:'app-pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {
    constructor(private readonly changeOffset:OffsetService){}
     currentPage:number=1;
    @Input() offsetValue!:number;
    @Input() totalData!:any;
    @Input() lengthValue!:number;
    @Input() totalLength!:number;
    get total():number {
        return Math.ceil(this.totalLength/5)
    }
    get pages(): any[] {
        const pages: any=[];
        for (let i = 1; i <= this.total;i++){
pages.push(i);
        }
        // const pagesToShow = 3;
        // const startPage = Math.max(
        //   1,
        //   this.currentPage - Math.floor(pagesToShow / 2)
        // );
        // const endPage = Math.min(this.total, startPage + pagesToShow - 1);
        // const firstPage = 1;
        // const lastPage = this.total;
    
        // const pages = startPage > firstPage ? [firstPage] : [];
    
        // for (let i = startPage; i <= endPage; i++) {
        //   pages.push(i);
        // }
        // if(firstPage<startPage-1){
        //   pages.splice(1,0,-1)
        // }
        // if (endPage < lastPage - 1) {
        //   pages.push(-1);
        // }
    
        // if (endPage < lastPage) {
        //   pages.push(lastPage);
        //   pages.push();
        // }
    
        return pages;
    
      }

      @Output() emitPage=new EventEmitter();
     public nextPage(){
      this.currentPage++;
      this.changeOffset.nextPage(this.currentPage);
      this.emitPage.emit()
    
      }
     public previousPage(){
      this.currentPage--;
        this.changeOffset.previousPage(this.currentPage);
        this.emitPage.emit()
      
        }
     
      public togglePage(page: number){
        this.currentPage = page;
        this.changeOffset.togglePage(page);
        console.log(page)
        this.emitPage.emit()

      }
}