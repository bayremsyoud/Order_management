import { Company } from "../clients/Company";
import { User } from "../users/user";

export class Order {
  _id: string='';
  nameOrder : string ='';
  companyOrder: Company = new Company() ;
  qteOrder: number =0;
  prixOrder: number =0;
  dateDebutOrder: Date = new Date;
  dateFinOrder: Date  = new Date;
  statusOrder: boolean =false;
  descOrder: string ='';
  employeeOrder: User [] =[];
  costOrder: number=0;
  isFactured: Boolean = false;
}
