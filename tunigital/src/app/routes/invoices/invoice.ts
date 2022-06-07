import { Company } from "../clients/Company";
import { Order } from "../orders/order";


export class Invoice {
  _id :any;
  statusInvoice: Boolean = false;
  companyInvoice : any;
  orderInvoice: any;
  dateInvoice: Date = new Date();
  costInvoice: Number =0;
  nomInvoice: string ='';
}
