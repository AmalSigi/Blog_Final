import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { authenticationApi } from "../http/authentication.service";

@Injectable({
    providedIn: 'root',
})
export class loginQuards{
    constructor(private readonly authService:authenticationApi,
        private readonly route:Router){}
canActivate():any{
   this.authService.isAuthorized().subscribe({
    next:(resp)=>{
return true;
    },
    error:()=>{
        this.route.navigate(['/login']);
        return false;

    }
   })
 
}
}