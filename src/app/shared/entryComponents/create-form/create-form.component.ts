import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {FormField} from '../../types/form';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit, AfterViewInit {
  form: FormArray;

  constructor(
    public dialogRef: MatDialogRef<CreateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public formFields: FormField[],
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.dialogRef.close({form_field_values: this.form.value});
  }

  private initForm(): void {
    this.form = new FormArray([]);
    this.formFields.forEach(formField => {
      this.form.insert(formField.order, new FormGroup({
        form_field_id: new FormControl(formField.id),
        value: new FormControl('')
      }));
    });
  }
}
