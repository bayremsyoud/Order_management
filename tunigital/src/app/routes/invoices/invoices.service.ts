import { Injectable } from '@angular/core';
import { Invoice } from './invoice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




const BASE_URL = 'http://localhost:5000/invoices';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private httpClient: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(BASE_URL + '/list/');
  }

  addInvoice(invoice: Invoice) {
    return this.httpClient.post(BASE_URL + '/add/', invoice);
  }

  deleteInvoice(id: String) {
    return this.httpClient.delete(BASE_URL + '/invoice/' + id);
  }

  editInvoice(id: String, invoice: Invoice) {
    return this.httpClient.put(BASE_URL + '/invoice/update/' + id, invoice);
  }

  getOneInvoice(id:any): Observable<Invoice> {
    return this.httpClient.get<Invoice>(BASE_URL + '/invoice/' + id);
  }

  uploadPdf(file: any) {
    return this.httpClient.post(BASE_URL + '/upload/', file);
  }


}
