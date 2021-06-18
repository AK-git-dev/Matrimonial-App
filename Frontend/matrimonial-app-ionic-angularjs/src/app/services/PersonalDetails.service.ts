import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient , HttpParams } from "@angular/common/http";
import { Post } from "../class/post";

@Injectable()
export class PersonalDetails {
    getcommentsbyparameter() {
      throw new Error('Method not implemented.');
    }
    
    constructor( private httpclient: HttpClient ) {} 

    getDetails(): Observable<any> {
        // let params1 = new HttpParams().set('userID',"1")
            
        return this.httpclient.get("http://localhost:5000/api/users", );
           
            // return this.httpclient.get("http://localhost:5000/api/users", {params:params1} );
    }



}