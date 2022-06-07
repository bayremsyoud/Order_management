import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  constructor(private router : Router, private route : ActivatedRoute, private ordersServ : OrdersService) { }

  order : Order = new Order();


  getOneOrder() {
    console.log(this.order)
    this.route.params.subscribe(param => {
      let id = param['id'];

        this.ordersServ.getOneOrder(id).subscribe(res => {
          this.order = res;
        });

    });
  }

  cancel() {
    this.router.navigate(['orders']);
  }

  ngOnInit(): void {
    this.getOneOrder()
  }

}
