import { Injectable, signal } from '@angular/core';
import { authenticationApi } from '../http/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class checkLoginService {
    constructor(private authService: authenticationApi){

    }
    public autherized = signal(true);
    public checkLogin(){

    this.authService.isAuthorized().subscribe({
        next:()=>{
            this.autherized.set(true);
            console.log('authorized')
        },
      error:(error)=>{
        if(error.message=="Unauthorized"){
            this.autherized.set(false);

        }
      }
    })

    
}


    
}


