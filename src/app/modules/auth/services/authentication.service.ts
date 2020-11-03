import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

import {LoginContext, LoginResponse} from '../../../shared/types';
import {CredentialsService} from './credentials.service';
import {TokensService} from './tokens.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private credentialsService: CredentialsService,
    private tokensService: TokensService,
    private router: Router,
  ) {
  }

  login({email, password, remember}: LoginContext): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth/login', {email, password})
      .pipe(
        tap(({expires_in, refresh_in, access_token, user}) => {
          this.credentialsService.setCredentials(user, remember);
          this.tokensService.setToken({access_token, expires_in, refresh_in}, remember);
        })
      );
  }

  refresh(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth/refresh', null)
      .pipe(
        tap(({expires_in, refresh_in, access_token}) => {
          this.tokensService.setToken({access_token, expires_in, refresh_in});
        })
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>('/auth/logout', null)
      .pipe(
        finalize(() => {
          this.credentialsService.setCredentials();
          this.tokensService.setToken();
          this.router.navigate(['login']);
        })
      );
  }
}
