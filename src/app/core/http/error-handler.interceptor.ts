import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {SnackBarService} from '../service/snack-bar.service';
import {CustomError} from '../../shared/types/error';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBarService: SnackBarService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  private errorHandler = (response: CustomError): Observable<HttpEvent<any>> => {
    this.snackBarService.showError(response?.error?.errors[0]?.title);
    throw response;
  }
}
