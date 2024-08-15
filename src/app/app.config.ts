import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorInterceptorService } from './service/interceptor/error-interceptor.service';
import { RequestInterceptorService } from './service/interceptor/request-interceptor.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  
  providers: [  
    provideHttpClient(withInterceptorsFromDi(),withFetch()),
    {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true,
  },provideRouter(routes), provideClientHydration(),provideAnimations(),]
};
