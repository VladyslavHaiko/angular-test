import {AuthUser} from './authUser.interface';

export interface LoginResponse {
  user: AuthUser;
  access_token: string;
  expires_in: number;
  refresh_in: number;
  token_type: string;
}
