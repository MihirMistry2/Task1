import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyDataService {
  constructor(private http: HttpClient) {}

  getAllCompanyList() {
    return this.http.get<any>('http://localhost:3200/api/companys/');
  }

  getCompanyById(id: number) {
    return this.http.get<any>(`http://localhost:3200/api/companys/${id}`);
  }

  createCompany(lists) {
    return this.http.post(`http://localhost:3200/api/companys/`, lists);
  }

  updateCompany(id, lists) {
    return this.http.patch(`http://localhost:3200/api/companys/${id}`, lists);
  }

  deleteCompany(id: number) {
    return this.http.delete(`http://localhost:3200/api/companys/${id}`);
  }
}
