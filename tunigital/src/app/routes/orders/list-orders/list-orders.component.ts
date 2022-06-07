import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from '../order';
import { Router, RouterModule } from '@angular/router';
import { DeleteOrderComponent } from '../delete-order/delete-order.component';
@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'nb',
    'Order',
    'Company',
    'Starting_date',
    'Status',
    'Employee',
    'action',
  ];
  dataSource = new MatTableDataSource<Order>();

 constructor(private orderService : OrdersService,private router : Router, private dialog : MatDialog) { }

  getOrders(){
    this.orderService.getOrders().subscribe( data => {
      this.dataSource.data= data;
console.log(data[0].employeeOrder)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  add() {
    this.router.navigate(['orders', 'add']);
  }

  delete(id : any){
      this.orderService.deleteOrders(id).subscribe(res => {
        this.getOrders()
      });
    }



    openDialogdel(order :Order): void {

        const dialogRef = this.dialog.open(DeleteOrderComponent, {
          data: order,
        });
        dialogRef.afterClosed().subscribe((result : any) => {
          if (result) {
            this.delete(result);
          }
        });
      }


  view(id:any){
    this.router.navigate(['orders','view',id])
  }



  edit(id:any){
    this.router.navigate(['orders','edit',id])
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getOrders()
  }

}
