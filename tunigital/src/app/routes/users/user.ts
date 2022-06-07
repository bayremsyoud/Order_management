export class User {
  _id:any;
  nomUser?: string;
  prenomUser?: string;
  emailUser?: string;
  numUser?: string;
  roleUser: string ='';
  passUser?: String;
  fullName:string = '';
  register_at?:Date;
  update_at?: Date;
  isConfirmed: Boolean=false;
  isActive: Boolean=false;
  isBlocked: Boolean=false;
  imageUser: any;
  isAdmin:Boolean=false;

}
