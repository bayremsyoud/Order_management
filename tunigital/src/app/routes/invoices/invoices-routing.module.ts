import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInvoicesComponent } from './list-invoices/list-invoices.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';

const routes: Routes = [{path:'',component:ListInvoicesComponent},
{path:'view/:id',component:ViewInvoiceComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
