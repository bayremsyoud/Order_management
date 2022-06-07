import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core';
import { CompaniesService } from 'app/routes/clients/clients.service';
import { Company } from 'app/routes/clients/Company';
import { User } from 'app/routes/users/user';
import { UsersService } from 'app/routes/users/users.service';
import { Order } from '../order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  clients: Company[] = [];
  minDate: Date = new Date;
  maxDate: Date = new Date;
  minaa: Date = new Date();
  id: any;
 order : Order = new Order();
  dateNow = new Date();
  minDate2: Date;
  disable2 = true;
  dated?: Date
  datef?: Date
  err = '';
  addSuccess = '';
  updateSuccess = '';
  checkD = false;
  constructor(
    private companyServ : CompaniesService ,
    private orderServ : OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private userServ: UsersService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.minDate2 = this.orderForm.controls.dateDebutOrder.value;

  }

  orderForm: FormGroup = new FormGroup({
    nameOrder: new FormControl('', [Validators.required, Validators.minLength(3)]),
    statusOrder: new FormControl('', [Validators.required]),
    dateDebutOrder: new FormControl('', [Validators.required]),
    dateFinOrder: new FormControl('', [Validators.required]),
    companyOrder: new FormControl('', [Validators.required]),
    descOrder: new FormControl(''),
    prixOrder: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    qteOrder: new FormControl('', [
      Validators.required,
      Validators.min(0),

    ]),
    employeeOrder : new FormControl('',Validators.required),
    isFactured: new FormControl(false)
  });

  getclients() {
    this.companyServ.getCompanies().subscribe(res => {
      this.clients = res;
      this.getUsers()
      this.getOneOrder()
    });
  }

  addOrder() {

    if (!this.order._id) {
      let order: Order;
      order = this.orderForm.value;
      this.orderServ.addOrders(order).subscribe(res => {
        console.log(res)
        this.router.navigate(['orders']);
      });
    } else {

        this.order = this.orderForm.value;

        this.orderServ.editOrders(this.id, this.order).subscribe(res => {
          console.log(res)
          this.router.navigate(['orders']);
        });
      }

  }



  getOneOrder() {
    console.log(this.order)
    this.route.params.subscribe(param => {
      let id = param['id'];
      if (!id) {
        new Order();
      } else {
        this.orderServ.getOneOrder(id).subscribe(res => {
          this.order = res;
          console.log(res.employeeOrder)
          this.id = id;
          this.patch(this.order);
        });
      }
    });
  }

  cancel() {
    this.router.navigate(['orders']);
  }

  userChose : User [] = []

  getUsers(){
    this.userServ.getUsers().subscribe(res =>{
let users = res;
for(let user of users){
  if(!user.isBlocked&&user.isActive&&!user.isAdmin){
    this.userChose.push(user);
    }
  }
});
  }



  patch(order : Order) {
    this.dated = new Date(this.order.dateDebutOrder);
    this.datef =  this.order.dateFinOrder
    this.dateNow = new Date();
    console.log(this.dateNow);


    this.orderForm.patchValue(order);
    this.orderForm.controls.companyOrder.patchValue(order.companyOrder._id);
    this.orderForm.controls.employeeOrder.patchValue(order.employeeOrder)
  }







  ngOnInit() {
    this.getclients();

  }

}
