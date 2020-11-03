import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {FormsService} from '../services/forms.service';
import {FormField, ServerResponse} from '../../../shared/types/form';

@Injectable({
  providedIn: 'root'
})
export class FormFieldsResolver implements Resolve<ServerResponse<FormField>> {

  constructor(
    private formsService: FormsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServerResponse<FormField>> {
    return this.formsService.getFormFields();
  }
}
