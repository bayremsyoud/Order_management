import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { SharedModule } from '@shared';
import { ViewOrderComponent } from './view-order/view-order.component';


@NgModule({
  declarations: [
    DeleteOrderComponent,AddOrderComponent,ListOrdersComponent, ViewOrderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
