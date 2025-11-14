import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    // evita parameter properties para não chatear o TS
    private snack: MatSnackBar;

    constructor(snack: MatSnackBar) {
        this.snack = snack;
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const status = error && error.status ? error.status : 0;
                let msg = 'Ocorreu um erro inesperado.';

                if (error && error.error && error.error.message) {
                    msg = error.error.message;
                } else if (status === 0) {
                    msg = 'Não foi possível comunicar com o servidor.';
                }

                this.snack.open(msg, 'Fechar', {
                    panelClass: 'snack-error',
                    duration: 6000,
                });

                // RxJS 6 – Angular 7
                return throwError(error);
            })
        );
    }
}
