import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({providedIn: "root"})
export class TokenService{

    base_url = environment.baseURL

    constructor(private http: HttpClient){}

    getTokens() {
        return this.http.get<any>(this.base_url + '/token/getTokens', {})
    }

    addToken(json: any){
        return this.http.post<any>(this.base_url + '/token/addToken', json)
    }
}