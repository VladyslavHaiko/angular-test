import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import {FormsTableComponent} from './components/forms-table/forms-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CreateFormComponent} from './entryComponents/create-form/create-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ShowInfoComponent } from './entryComponents/show-info/show-info.component';
import { SuggestDeleteComponent } from './entryComponents/suggest-delete/suggest-delete.component';
import { ChangeFormComponent } from './entryComponents/change-form/change-form.component';


@NgModule({
  declarations: [
    LoaderComponent,
    FormsTableComponent,
    CreateFormComponent,
    ShowInfoComponent,
    SuggestDeleteComponent,
    ChangeFormComponent
  ],
  exports: [
    LoaderComponent,
    FormsTableComponent,
    CreateFormComponent
  ],
  entryComponents: [
    CreateFormComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedModule {
}
