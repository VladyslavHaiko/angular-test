import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {Form, FormField} from '../../types/form';

@Component({
  selector: 'app-change-form',
  templateUrl: './change-form.component.html',
  styleUrls: ['./change-form.component.scss']
})
export class ChangeFormComponent implements OnInit {
  form: FormArray;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { form: Form, formFields: FormField[] },
    public dialogRef: MatDialogRef<ChangeFormComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  update(): void {
    this.data.form.form_field_values = this.form.value;
    this.dialogRef.close(this.data.form);
  }

  private initForm(): void {
    this.form = new FormArray([]);
    this.data.formFields.forEach((formField, index) => {
      this.form.insert(formField.order, new FormGroup({
        form_field_id: new FormControl(formField.id),
        value: new FormControl(this.data.form.form_field_values[index]?.value)
      }));
    });
  }
}
