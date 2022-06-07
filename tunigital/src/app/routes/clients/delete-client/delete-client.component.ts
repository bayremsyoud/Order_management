import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../Company';
import { ListClientComponent } from '../list-client/list-client.component';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.scss'],
})
export class DeleteClientComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListClientComponent>,
    @Inject(MAT_DIALOG_DATA) public company: Company
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
