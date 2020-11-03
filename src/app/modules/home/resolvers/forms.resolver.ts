import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {FormsService} from '../services/forms.service';
import {Form, ServerResponse} from '../../../shared/types/form';

@Injectable({
  providedIn: 'root'
})
export class FormsResolver implements Resolve<ServerResponse<Form>> {

  constructor(
    private formsService: FormsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServerResponse<Form>> {
    return this.formsService.getAll();
  }
}
