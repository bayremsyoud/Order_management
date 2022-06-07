import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SharedModule } from '@shared';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
ListUsersComponent,
DeleteUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class UsersModule { }
