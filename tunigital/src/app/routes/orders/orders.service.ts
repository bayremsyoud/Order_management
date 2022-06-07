import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order';

const BASE_URL = 'http://localhost:5000/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient : HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(BASE_URL + '/list');
  }

  addOrders(order: Order) {
    return this.httpClient.post(BASE_URL + '/add', order);
  }

  deleteOrders(id: String) {
    return this.httpClient.delete(BASE_URL + '/order/' + id);
  }

  editOrders(id: any, order: Order) {

    return this.httpClient.put(BASE_URL + '/order/update/' + id, order);

  }

  getOneOrder(id:String): Observable<Order> {
    return this.httpClient.get<Order>(BASE_URL + '/order/' + id);
  }


}
