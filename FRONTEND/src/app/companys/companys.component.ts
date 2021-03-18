import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDataService } from '../service/company-data.service';

export class DataList {
  constructor(
    public _id: number,
    public name: string,
    public description: string,
    public phone: number,
    public image: string,
    public state: string,
    public city: string
  ) {}
}

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.css'],
})
export class CompanysComponent implements OnInit {
  isEmty: boolean = false;
  searchText: string;
  lists: DataList[] = [];
  key: string = 'name';
  reverse: boolean = false;
  p: number = 1;
  pageSize: number = 5;

  constructor(
    private router: Router,
    private companyDataService: CompanyDataService
  ) {}

  ngOnInit(): void {
    this.onFetch();
  }

  onFetch() {
    this.companyDataService.getAllCompanyList().subscribe(
      (response) => {
        this.isEmty = false;
        this.lists = response['result'];
      },
      (error) => {
        if (error) console.log(error);
        this.isEmty = true;
      }
    );
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}