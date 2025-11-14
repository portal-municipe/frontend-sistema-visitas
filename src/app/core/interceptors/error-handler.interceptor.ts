import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private snack: MatSnackBar) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                const msg = err.error?.message || err.statusText || 'Erro inesperado';
                this.snack.open(msg, 'Fechar', { panelClass: 'snack-error', duration: 6000 });
                return throwError(() => err);
            })
        );
    }
}