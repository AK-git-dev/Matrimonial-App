import { Injectable } from '@angular/core';
import { Observable, throwError, pipe, of } from "rxjs";
import { HttpClient , HttpParams } from "@angular/common/http";
import { Post } from "../class/post";
import {HttpHeaders} from '@angular/common/http';
import { map, filter, catchError, mergeMap } from "rxjs/operators";

@Injectable()
export class PersonalDetails {
    
  getcommentsbyparameter() {
      throw new Error('Method not implemented.');
    }
    httpOptions: {headers: HttpHeaders}={
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor( private httpclient: HttpClient ) {}

   // Send OTP on registration time
    sendotp(phoneNumber){
      return this.httpclient.post(`/api/auth/signup`,
      {phoneNumber},{...this.httpOptions,withCredentials:true})
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
    }

    public isAuthenticated(): boolean {
      return this.getToken() != null;
    }
    storeToken(token: any) {
      localStorage.setItem("token", token);
    }
    getToken() {
      return localStorage.getItem("token");
    }
    removeToken() {
      return localStorage.removeItem("token");
    }
    errorHandler(error: Response) {
      console.log(error);
      return throwError(error);
    }

    // loginOTP Verify
    otpverify(User) {
      return this.httpclient.patch(`/api/auth/login/otp/verify`,
      User,{...this.httpOptions,withCredentials:true});
    }

    // Update Profle/info
    basicdetails(User){
      return this.httpclient.patch(`/api/profile/update-info`,
      User,{...this.httpOptions,withCredentials:true});

    }
    // Add Education
    addeducation(User){
      return this.httpclient.post(`/api/profile/add-education-details`,
      User,{...this.httpOptions,withCredentials:true});

    }

    // Add Occupation
    addoccupation(User){
      return this.httpclient.post(`/api/profile/update-occupation-details`,
      User,{...this.httpOptions,withCredentials:true});

    }
    
    // Add Pref Partner
    addpreference(User){
      return this.httpclient.post(`/api/profile/update-preffered-partner`,
      User,{...this.httpOptions,withCredentials:true});

    }


    // Login with OTP
    loginsendotp(phoneNumber)
    {
      return this.httpclient.post(`/api/auth/login/with-otp`,
      {phoneNumber},{...this.httpOptions,withCredentials:true});

    }

    // get user details
    userDetail(): Observable<any> {
      return this.httpclient.get(`/api/user/details`,{...this.httpOptions,withCredentials:true});
     
    }

    // Logout User
    logout() {
      return this.httpclient.get('/api/auth/logout',{...this.httpOptions,withCredentials:true})

    }

    // Add Lifestyle
    addLifestyle(User)
    {
      return this.httpclient.post(`/api/profile/update-lifestyle`,
      User,{...this.httpOptions,withCredentials:true});
    }

    // Add Family Details
    addFamilyDetails(User)
    {
      return this.httpclient.post(`/api/profile/update-family-details`,
      User,{...this.httpOptions,withCredentials:true});
    }

}
