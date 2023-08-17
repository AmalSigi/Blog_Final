import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class loginQuards{
    constructor(private readonly http:HttpClient,
        private readonly route:Router){}
    public url: string="http://192.168.29.97:5296/Authentication/isAuthorized"
canActivate():any{
   this.http.post(this.url,{}).subscribe({
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