import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  /*
  constructor(
    private authService: AuthService
  ) { }
  
    
  intercept(req: any, next:any) {

    const token = this.authService.getToken();

    if (!token) return next.handle(req);
    

    const tokenizeReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
    
    return next.handle(tokenizeReq);
  }
  */

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = localStorage.getItem('token')!;

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError( err );

      })
    );
  }
  
  
}
