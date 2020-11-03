import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Form, FormField, FormFieldValue, FormQueryParams, ServerResponse} from '../../../shared/types/form';
import {createHttpParams} from '../../../shared/helpers/httpParams.helper';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(
    private http: HttpClient
  ) {
  }

  save(form: { form_field_values: Array<FormFieldValue> }): Observable<{ data: Form }> {
    return this.http.post<{ data: Form }>('/forms', form);
  }

  update({id, form_field_values}: Form): Observable<{ data: Form }> {
    return this.http.post<{ data: Form }>(`/forms/${id}`, {form_field_values});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>('/forms/' + id);
  }

  getAll(query?: FormQueryParams): Observable<ServerResponse<Form>> {
    return this.http.get<ServerResponse<Form>>('/forms', {
      params: createHttpParams(query)
    });
  }

  getFormFields(): Observable<ServerResponse<FormField>> {
    return this.http.get<ServerResponse<FormField>>('/form_fields');
  }
}
