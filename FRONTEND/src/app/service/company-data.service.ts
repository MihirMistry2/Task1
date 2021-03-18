import { HttpClient } from '@angular/common/http';
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
}
