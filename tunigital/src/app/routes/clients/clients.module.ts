import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { AddClientComponent } from './add-client/add-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { SharedModule } from '@shared';


@NgModule({
  declarations: [
    AddClientComponent,
    ListClientComponent,
    DeleteClientComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule
  ]
})
export class ClientsModule { }
