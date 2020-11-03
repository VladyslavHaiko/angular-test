import {HttpParams} from '@angular/common/http';

import {FormQueryParams} from '../types/form';

export const createHttpParams = (params: FormQueryParams): HttpParams => {
  if (!params) {
    return;
  }
  let httpParams = new HttpParams();

  Object.keys(params).forEach(key => {
    if (params[key]) {
      httpParams = httpParams.append(key, params[key]);
    }
  });

  return httpParams;
};
