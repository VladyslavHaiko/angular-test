import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {Form, FormField} from '../../types/form';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.scss']
})
export class ShowInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { form: Form, formFields: FormField[]},
    public dialogRef: MatDialogRef<ShowInfoComponent>
  ) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
