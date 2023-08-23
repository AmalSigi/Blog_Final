import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { categoryApi } from 'src/app/core/http/category.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public showSubCat: boolean = false;
  public showCategory: boolean = false;
  public index!: number;
  public category: any;
  public userDetails:any;
  public showLogOut:boolean=false;
  public showUserDetails:boolean=false;
  public indexPosition!:number;
  public subIndexPosition!:number;


  @Output() onChange: EventEmitter<any> = new EventEmitter()
  constructor(
    private readonly categoryApi: categoryApi,
    private readonly reloadData: trackDataService,
    private readonly userApiService:userApi,
    private readonly refreshData: trackDataService
  ) {}
  ngOnInit(): void {
    this.getCategory();
    this.getUserDetails();
    
  }
  public getUserDetails(){
    this.userApiService.currentUserDetails().subscribe({
      next:(response)=>{
       this.userDetails = response;
      this.showUserDetails=true;
      },
      error:()=>{
        this.showUserDetails=false;

      }

    })
  }

  public getCategory() {
    this.categoryApi.getCategory().subscribe((response: any) => {
      this.category = response;
    });
  }

  public showSubCategory(index: number) {
    this.index = index;
    this.showSubCat = !this.showSubCat;
  }
  public reload(index: number) {
    this.indexPosition=index;
    this.reloadData.sendClickEvent1();
    this.showCategory = false;
    this.showSubCat = false;
  }
  public moreCategory() {
    this.showCategory = !this.showCategory;
  }
  public login(){
this.onChange.emit();
this.getUserDetails();
  }
  public logOut(){
    if(confirm("Are you sure you want to log out ?")){
      localStorage.removeItem('jwtToken');
      this.getUserDetails();
      this.showLogOut=false;
      this.refreshData.sendClickEvent1();
    }
  
    
  }
}
