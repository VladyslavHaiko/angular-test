import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ShellComponent} from './shell.component';
import {HeaderComponent} from './header/header.component';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [HeaderComponent, ShellComponent],
    imports: [
        CommonModule,
        RouterModule,
        NgbCollapseModule,
        NgbModule,
        MatIconModule
    ]
})
export class ShellModule {
}
