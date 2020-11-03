import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home.component';
import {Shell} from '../shell/services/shell.service';
import {FormsResolver} from './resolvers/forms.resolver';
import {FormFieldsResolver} from './resolvers/formFields.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      component: HomeComponent,
      resolve: {
        serverData: FormsResolver,
        formFields: FormFieldsResolver
      }
    }
  ]),
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
