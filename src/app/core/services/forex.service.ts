import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ForexService {
    private base = environment.fastForex.baseUrl;
    private key = environment.fastForex.apiKey;


    constructor(private http: HttpClient) { }


    /** GET /fetch-one?from=USD&to=AOA */
    fetchOne(from: string, to: string): Observable<any> {
        const params = new HttpParams().set('from', from).set('to', to);
        const headers = new HttpHeaders().set('X-API-Key', this.key);
        return this.http.get(`${this.base}/fetch-one`, { params, headers });
    }
}
