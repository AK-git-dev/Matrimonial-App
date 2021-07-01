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

     getDetails(): Observable<any> {
        // let params1 = new HttpParams().set('userID',"1")
      return this.httpclient.get("http://localhost:5000/api/users?id=1", );
           // return this.httpclient.get("http://localhost:5000/api/users", {params:params1} );
    }

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



    basicdetails(User){
      return this.httpclient.patch(`/api/profile/update-info`,
      User,{...this.httpOptions,withCredentials:true});

    }

    addeducation(User){
      return this.httpclient.post(`/api/profile/add-education-details`,
      User,{...this.httpOptions,withCredentials:true});

    }
    addoccupation(User){
      return this.httpclient.post(`/api/profile/update-occupation-details`,
      User,{...this.httpOptions,withCredentials:true});

    }

    addpreference(User){
      return this.httpclient.post(`/api/profile/update-preffered-partner`,
      User,{...this.httpOptions,withCredentials:true});

    }


    loginsendotp(phoneNumber)
    {
      return this.httpclient.post(`/api/auth/login/with-otp`,
      {phoneNumber},{...this.httpOptions,withCredentials:true});

    }






}
