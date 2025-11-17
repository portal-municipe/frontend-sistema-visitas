import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class WeatherService {
    private base = environment.openWeather.baseUrl;
    private key = environment.openWeather.apiKey;


    constructor(private http: HttpClient) { }


    /** Tempo atual por latitude/longitude */
    getCurrent(lat: number, lon: number) {
        const params = new HttpParams()
            .set('lat', lat.toString()).set('lon', lon.toString())
            .set('appid', this.key)
            .set('units', environment.openWeather.units)
            .set('lang', environment.openWeather.lang);
        return this.http.get(`${this.base}/data/2.5/weather`, { params });
    }


    /** Tempo atual por cidade/país */
    getCurrentByCity(city: string, country?: string) {
        const q = country ? `${city},${country}` : city;
        const params = new HttpParams()
            .set('q', q)
            .set('appid', this.key)
            .set('units', environment.openWeather.units)
            .set('lang', environment.openWeather.lang);
        return this.http.get(`${this.base}/data/2.5/weather`, { params });
    }
}
