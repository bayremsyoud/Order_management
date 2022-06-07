import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './Company';


const BASE_URL = 'http://localhost:5000/companies';
@Injectable({
  providedIn: 'root'
})


export class CompaniesService {

  constructor(private httpClient : HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(BASE_URL + '/list');
  }

  addCompany(company: Company) {
    return this.httpClient.post(BASE_URL + '/add', company);
  }

  deleteCompany(id: String) {
    return this.httpClient.delete(BASE_URL + '/company/' + id);
  }

  editCompany(id: String, company: Company) {
    return this.httpClient.put(BASE_URL + '/company/update/' + id, company);
  }

  getOneCompany(id:String): Observable<Company> {
    return this.httpClient.get<Company>(BASE_URL + '/company/' + id);
  }

  getEmailCompany(email: String): Observable<string> {
    return this.httpClient.get<string>(BASE_URL + '/company/email_verif/' + email);
  }
}
