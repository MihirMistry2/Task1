import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyDataService } from '../service/company-data.service';

export class List {
  constructor(
    public name: string,
    public email: string,
    public description: string,
    public phone: string,
    public logo: string,
    public state: string,
    public city: string
  ) {}
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  id: number;
  selectFile: File = null;
  lists: List;
  isError: boolean = false;
  isSuccess: boolean = false;
  successMessage: string;
  errorMessage: string;
  stateList: Array<any> = [
    {
      name: 'Gujarat',
      cities: ['Ahmedabad', 'Surat', 'Vadodara'],
    },
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
    { name: 'Goa', cities: ['Panaji Grove', 'Margao', 'Mapusa'] },
  ];
  cities: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private companyDataService: CompanyDataService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.lists = new List('', '', '', '', '', '', '');

    if (this.id != -1) {
      this.companyDataService.getCompanyById(this.id).subscribe((response) => {
        this.lists = response['result'];
        this.lists.logo = 'http://localhost:3200/' + response['result'].image;
      });
    }
  }

  onStateChange(count) {
    this.cities = this.stateList.find((con) => con.name == count).cities;
  }

  onFileSelected(event) {
    this.selectFile = <File>event.target.files[0];
  }

  errorShowMsg(err) {
    this.isError = true;
    this.errorMessage = `${err} can not be empty`;
    return false;
  }

  isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isPhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
  }

  isValid() {
    if (this.lists.name === '') {
      return this.errorShowMsg('name');
    }
    if (this.lists.email === '') {
      return this.errorShowMsg('email');
    }
    if (!this.isEmail(this.lists.email)) {
      this.isError = true;
      this.errorMessage = 'email id invalid';
      return false;
    }
    if (this.lists.phone === '') {
      return this.errorShowMsg('phone');
    }
    if (!this.isPhone(this.lists.phone)) {
      this.isError = true;
      this.errorMessage = 'pnone number invalid';
      return false;
    }
    if (this.selectFile === null) {
      return this.errorShowMsg('please select logo image');
    }
    if (this.lists.description === '') {
      return this.errorShowMsg('description');
    }
    if (this.lists.state === '') {
      return this.errorShowMsg('state');
    }
    if (this.lists.city === '') {
      return this.errorShowMsg('city');
    }
    return true;
  }

  onSubmit() {
    if (this.isValid()) {
      const fd = new FormData();
      fd.append('logo', this.selectFile);
      fd.append('name', this.lists.name);
      fd.append('email', this.lists.email);
      fd.append('description', this.lists.description);
      fd.append('phone', this.lists.phone);
      fd.append('state', this.lists.state);
      fd.append('city', this.lists.city);

      if (+this.id === -1) {
        this.companyDataService.createCompany(fd).subscribe(
          (response) => {
            this.isSuccess = true;
            this.successMessage = response['message'];
            this.lists.name = '';
            this.lists.email = '';
            this.lists.description = '';
            this.lists.state = '';
            this.lists.city = '';
            this.lists.phone = '';
          },
          (error) => {
            this.isError = true;
            this.errorMessage = error['error'].error;
          }
        );
      } else {
        this.companyDataService.updateCompany(this.id, fd).subscribe(
          (response) => {
            this.isSuccess = true;
            this.successMessage = response['message'];
          },
          (error) => {
            this.isError = true;
            this.errorMessage = error['error'].error;
          }
        );
      }
    }
  }
}
