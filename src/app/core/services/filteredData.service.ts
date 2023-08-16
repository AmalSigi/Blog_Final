import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class postFilterService {
  public getPost(post: any) :  any{
   const newPost:any=[];

    
      let heading = post.postSections.filter(
        (item: any) => item.sectionTypeId == 1
      );

      let img = post.postSections.filter(
        (item: any) => item.sectionTypeId == 4
      );

      let subHeading = post.postSections.filter(
        (item: any) => item.sectionTypeId == 2
      );

      let obj = {
        postId: post.id,

        heading: heading[0],

        subHeading: subHeading[0],

        img: img[0],
      };

     
      return obj;

      
  
  }
}
