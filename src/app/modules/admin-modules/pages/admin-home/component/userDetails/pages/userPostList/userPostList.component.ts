import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { SharedModelComponent } from '../shared/components/shared-model/shared-model.component';

@Component({
  selector: 'app-user-posts',
  templateUrl: './userPostList.component.html',

})
export class UserPostsComponent {
  constructor(private route:ActivatedRoute,private http:HttpClient){}

userId!:number
userPosts:any[]=[];
public viewPost:boolean = false;
public post!:any;


ngOnInit():void{
  this.route.queryParams.subscribe(params=>{
    this.userId= params['userId'];
    console.log(this.userId);
    this.loadPosts()

  })
}

public loadPosts(){
  this.http.get<any[]>(`http://192.168.29.97:5296/Post/${this.userId}/authoredPosts`)
  .subscribe((posts:any[])=>{
    
    this.userPosts=posts
    console.log(this.userPosts)
  })
}
public openModal(index:any){
this.viewPost=true;

this.post=this.userPosts[index];
//   const modalRef=this.modalService.open(SharedModelComponent,{
//     size:'lg',
//   });

//   modalRef.componentInstance.post=post;
}
}
