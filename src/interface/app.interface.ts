export interface ICompanyForm {
   name:string;
   address:string;
}
export interface IUsersForm {
   name:string;
   surname:string;
   status:string;
}
export interface ICompany extends ICompanyForm{
   id:number;
   users:IUsers[]
}
export interface IUsers extends IUsersForm{
   id:number;
}
