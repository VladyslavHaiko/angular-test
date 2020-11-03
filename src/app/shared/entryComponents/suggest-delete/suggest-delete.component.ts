import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-suggest-delete',
  templateUrl: './suggest-delete.component.html',
  styleUrls: ['./suggest-delete.component.scss']
})
export class SuggestDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SuggestDeleteComponent>) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close(true);
  }
}
