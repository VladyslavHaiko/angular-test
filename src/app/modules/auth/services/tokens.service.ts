import {Injectable} from '@angular/core';
import {Token} from '../../../shared/types/auth';

const tokensKey = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokensService {
  private _token: Token | null = null;

  constructor() {
    const savedTokens = sessionStorage.getItem(tokensKey) || localStorage.getItem(tokensKey);
    if (savedTokens) {
      this._token = JSON.parse(savedTokens);
    }
  }

  get token(): Token | null {
    return this._token;
  }

  setToken(token?: Token, remember = true): void {
    this._token = token || null;

    if (token) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(tokensKey, JSON.stringify(token));
    } else {
      sessionStorage.removeItem(tokensKey);
      localStorage.removeItem(tokensKey);
    }
  }
}
