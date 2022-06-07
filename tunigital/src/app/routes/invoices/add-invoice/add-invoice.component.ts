import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'app/routes/clients/Company';
import { ListClientComponent } from 'app/routes/clients/list-client/list-client.component';
import { Order } from 'app/routes/orders/order';
import { OrdersService } from 'app/routes/orders/orders.service';
import { Invoice } from '../invoice';
import { InvoicesService } from '../invoices.service';
import { ListInvoicesComponent } from '../list-invoices/list-invoices.component';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListInvoicesComponent>,
    @Inject(MAT_DIALOG_DATA) public action: Boolean, private orderServ : OrdersService,private InvoiceServ : InvoicesService

  ) {}

  invoiceForm : FormGroup = new FormGroup  ({ order : new FormControl('',[Validators.required])})

  orders : Order[] = [];

  getOrders(){
    this.orderServ.getOrders().subscribe(res=>{
      this.getNoneFactured(res);
    })
  }

  selectedValue : Order = new Order;


  getNoneFactured(orders : Order[]){
    for(let order of orders){
      if(!order.isFactured){
        this.orders.push(order);
      }
    }
  }


  setInvoice(){
    this.orderServ.getOneOrder(this.invoiceForm.controls.order.value).subscribe(res=>{
      let order : Order = res
      console.log(this.invoiceForm.controls.order.value)
      let invoice : Invoice = new Invoice();
      invoice.nomInvoice = `Facture of ${order.nameOrder}`;
      invoice.costInvoice = (order.prixOrder * order.qteOrder)*1.19;;
      invoice.statusInvoice = false;
      invoice.dateInvoice = new Date();
      invoice.orderInvoice = order._id;
      invoice.companyInvoice = order.companyOrder._id;
      order.isFactured = true;
  this.InvoiceServ.addInvoice(invoice).subscribe()
  this.orderServ.editOrders(order._id,order).subscribe(res=>{
    this.close()
  })
    })


  }







  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getOrders();
  }

}
