import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {Form, FormField} from '../../types/form';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ShowInfoComponent} from '../../entryComponents/show-info/show-info.component';
import {SuggestDeleteComponent} from '../../entryComponents/suggest-delete/suggest-delete.component';
import {ChangeFormComponent} from '../../entryComponents/change-form/change-form.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-forms-table',
  templateUrl: './forms-table.component.html',
  styleUrls: ['./forms-table.component.scss']
})
export class FormsTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'user_id', 'created_at', 'updated_at', 'info', 'change', 'delete'];

  @Input()
  data: Form[] = [];

  @Input()
  formFields: FormField[] = [];

  @Output()
  deleteFormEvent = new EventEmitter<number>();

  @Output()
  updateFormEvent = new EventEmitter<Form>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  showInfo(form: Form): void {
    this.dialog.open(ShowInfoComponent, {
      data: {
        form,
        formFields: this.formFields
      },
      disableClose: true
    });
  }

  change(form: Form): void {
    const dialogRef = this.dialog.open(ChangeFormComponent,
      {
        data: {
          form,
          formFields: this.formFields
        },
        disableClose: true
      });

    dialogRef.afterClosed()
      .pipe(
        filter(value => value)
      )
      .subscribe(updatedForm => this.updateFormEvent.emit(updatedForm));
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(SuggestDeleteComponent, {
      disableClose: true
    });

    dialogRef.afterClosed()
      .pipe(
        filter(value => value)
      )
      .subscribe(() => this.deleteFormEvent.emit(id));
  }
}
