import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class DataService {
    endpoint = 'https://azurestorageblobapi.azurewebsites.net';
    constructor(public http: HttpClient) {
    }

    getSeries(): Observable<any> {
        return this.http.get(`${this.endpoint}/series`);
    }

    getSermons(series: string): Observable<any> {
        return this.http.get(`${this.endpoint}/Sermon?series=${series}`);
    }

    getItem(id: number): Observable<any> {
        return this.http.get(`${this.endpoint}/series`);
    }
}
