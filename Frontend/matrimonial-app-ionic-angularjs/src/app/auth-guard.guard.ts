
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonalDetails } from "../app/services/PersonalDetails.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
 
  constructor(public auth: PersonalDetails, public router: Router ) {}
 
  canActivate(): boolean {
    if(!this.auth.isAuthenticated()) {
      console.log('You are not authrised to view this page')
    return false;
    }
    return true;
  }
    
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
}