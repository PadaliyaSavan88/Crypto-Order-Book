import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({providedIn: "root"})
export class TradeService{

    base_url = environment.baseURL

    constructor(private http: HttpClient){}

    getTrades() {
        return this.http.get<any>(this.base_url + '/trade/getTrade', {})
    }

    createTrade(json: any){
        return this.http.post<any>(this.base_url + '/trade/createTrade', json)
    }

    getHistory(){
        return this.http.get<any>(this.base_url + '/history/getHistory', {})
    }
}