import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 1) Não mexer em URLs absolutas (http / https)
        if (req.url.startsWith('http://') || req.url.startsWith('https://')) {
            return next.handle(req);
        }

        // 2) Não mexer em assets estáticos (traduções, imagens, etc.)
        if (
            req.url.startsWith('./assets') ||
            req.url.startsWith('/assets') ||
            req.url.indexOf('assets/i18n/') !== -1
        ) {
            return next.handle(req);
        }

        // 3) Para o resto, prefixar com a API
        const apiReq = req.clone({
            url: `${environment.apiBase}/${req.url}`
        });

        return next.handle(apiReq);
    }
}
