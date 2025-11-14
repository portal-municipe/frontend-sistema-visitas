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
            catchError((error: HttpErrorResponse) => {
                const status = error && error.status ? error.status : 0;
                const msg =
                    error && error.error && error.error.message
                        ? error.error.message
                        : 'Ocorreu um erro inesperado.';
                this.snack.open(msg, 'Fechar', { panelClass: 'snack-error', duration: 6000 });
                return throwError(() => error);
            })
        );
    }
}