import { Injectable } from '@angular/core';
import { authenticationApi } from '../http/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class checkLoginService {
    constructor(private authService: authenticationApi){

    }
    public checkLogin():boolean{
const token=localStorage.getItem('jwtToken')
if(token){
    // this.authService.isAuthorized().subscribe({
    //     next:()=>{
    //         return true;
    //     },
      
    // })
    return true
}
else{
    return false;
}
    }
    
}