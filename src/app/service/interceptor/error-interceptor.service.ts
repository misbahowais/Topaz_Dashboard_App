import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
// import { LoaderService } from './loader.service';
@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
    constructor(
    ) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            //retry(1),
            catchError((err: any): Observable<HttpEvent<any>> => {
                let message = '';

                if (err.status === 401)
                    message = 'Incorrect UserName and Password Please try Again';

                else if (err.status === 400) {
                    var err0 = err.error;
                    console.log(err0);
                    if (typeof (err0) === "object") {
                        if (err0.hasOwnProperty('errors')) {
                            err0.errors.forEach((element: any, index: number) => {
                                if (element.hasOwnProperty("description")) {
                                    message = message + element["description"];
                                }
                            });
                        } else {
                            err0.forEach((element: any, index: number) => {
                                if (element.hasOwnProperty("description")) {
                                    message = message + element["description"];
                                }
                            });
                        }
                    } else {
                        message = '400 ' + err.error;
                    }

                }


                else if (err.status === 404) { message = '404: not found'; return err; }

                else { message = 'Unexpected error: Something went wrong...'; }
               
                

                return throwError(err);
            })
        );
    }
}