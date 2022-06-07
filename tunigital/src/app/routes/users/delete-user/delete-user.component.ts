import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListUsersComponent } from '../list-users/list-users.component';
import { User } from '../user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {}

  user: User = this.data.user;
  action = this.data.action;

  ngOnInit(): void {
  }

}
