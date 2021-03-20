import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyDataService {
  constructor(private http: HttpClient) {}

  // fetch all lists from API
  getAllCompanyList() {
    return this.http.get<any>('http://localhost:3200/api/companys/');
  }

  // fetch single list by id from API
  getCompanyById(id: number) {
    return this.http.get<any>(`http://localhost:3200/api/companys/${id}`);
  }

  // send form data on submit to API
  // lists as form data with image file
  createCompany(lists) {
    return this.http.post(`http://localhost:3200/api/companys/`, lists);
  }

  // send updated change data on form submit
  // id for update single list entry
  // / lists as form data with image file
  updateCompany(id, lists) {
    return this.http.patch(`http://localhost:3200/api/companys/${id}`, lists);
  }

  // send delete req by id
  deleteCompany(id: number) {
    return this.http.delete(`http://localhost:3200/api/companys/${id}`);
  }
}
