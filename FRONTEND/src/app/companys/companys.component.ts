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
  message: string = '';
  error: string = '';

  constructor(
    private router: Router,
    private companyDataService: CompanyDataService
  ) {}

  ngOnInit(): void {
    this.onFetch();
  }

  // get all list of company detail
  onFetch() {
    this.companyDataService.getAllCompanyList().subscribe(
      (response) => {
        this.isEmty = false;
        this.lists = response['result'];
      },
      (error) => {
        if (error) console.log(error);
        this.isEmty = true;
        this.error = error['error'].error;
      }
    );
  }

  // delete item by its id
  onDelete(id: number) {
    this.companyDataService.deleteCompany(id).subscribe(
      (response) => {
        this.message = 'Succesfuly Comapany List Delete';
        this.ngOnInit();
      },
      (error) => {
        if (error) console.log(error);
        this.error = error.error['error'].error;
      }
    );
  }

  // redirect to form page with item id
  onEdit(id: number) {
    this.router.navigate(['/lists', id]);
  }

  // search elemnt from table by name only
  Search() {
    if (this.searchText == '') {
      this.ngOnInit();
    } else {
      this.lists = this.lists.filter((res) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.searchText.toLocaleLowerCase());
      });
    }
  }

  // sort table by asc/desc order
  // key as which column want order by asc/desc
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
