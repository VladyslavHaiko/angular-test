import {Routes, Route} from '@angular/router';

import {AuthenticationGuard} from '../../auth/guards/authentication.guard';
import {ShellComponent} from '../shell.component';

export class Shell {
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
    };
  }
}
