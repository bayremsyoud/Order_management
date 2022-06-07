import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListOrdersComponent } from '../list-orders/list-orders.component';
import { Order } from '../order';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.scss']
})
export class DeleteOrderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public order : Order
  ) {}

  ngOnInit(): void {
  }

}
