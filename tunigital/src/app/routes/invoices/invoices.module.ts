import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { ListInvoicesComponent } from './list-invoices/list-invoices.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { SharedModule } from '@shared';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';


@NgModule({
  declarations: [
    ListInvoicesComponent,
    EditInvoiceComponent,
    ViewInvoiceComponent,
    AddInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule
  ]
})
export class InvoicesModule { }
