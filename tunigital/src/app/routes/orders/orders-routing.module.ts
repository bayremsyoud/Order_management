import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [{path:'',component:ListOrdersComponent},
{path:'add',component:AddOrderComponent},
{path:'edit/:id',component:AddOrderComponent},
{path:'view/:id',component:ViewOrderComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
