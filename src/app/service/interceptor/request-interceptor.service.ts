import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthInfoService } from '../auth-info/auth-info.service';

@Injectable({
    providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {
    constructor() { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                // Authorization: `Bearer ${this.authInfo.getToken()}`,
            },
        });
        return next.handle(request);
    }
}