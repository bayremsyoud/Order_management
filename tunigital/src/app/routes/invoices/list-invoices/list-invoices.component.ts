import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Company } from 'app/routes/clients/Company';
import { Order } from 'app/routes/orders/order';
import { OrdersService } from 'app/routes/orders/orders.service';
import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';
import { Invoice } from '../invoice';
import { InvoicesService } from '../invoices.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.scss']
})
export class ListInvoicesComponent implements OnInit {
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

item : Number = 8;
displayedColumns: string[] = [
  'nb',
  'invoice',
  'order',
  'company',
  'date',
  'status',
  'cost',
  'action',
];
dataSource = new MatTableDataSource<Invoice>();

  constructor(private invoiceService: InvoicesService,private router:Router,private dialog: MatDialog,private orderServ : OrdersService) {

  }
  page: any;
  invoices: Invoice[] = [];


  getIncoices() {
    this.invoiceService.getInvoices().subscribe(res => {
      this.invoices = res;
      console.log(res)
      this.dataSource.data = this.invoices;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(company:any): void {
    const dialogRef = this.dialog.open(AddInvoiceComponent, {
      width: '520px',
      data: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getIncoices()
    });
  }






  viewInvoice(id:any) {
    this.router.navigate(['invoices', 'view', id]);
  }


  add(){

  }


  ngOnInit() {
    this.getIncoices()
  }
}
