import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  // lists of state with its city
  stateList: Array<any> = [
    {
      name: 'Gujarat',
      cities: ['Ahmedabad', 'Surat', 'Vadodara'],
    },
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
    { name: 'Goa', cities: ['Panaji Grove', 'Margao', 'Mapusa'] },
  ];

  // create empty array of city
  cities: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyDataService: CompanyDataService
  ) {}

  ngOnInit(): void {
    // get id from URL
    this.id = this.route.snapshot.params['id'];
    this.lists = new List('', '', '', '', '', '', '');

    // check if id is not -1 then send req and fetch single data and store on list
    if (this.id != -1) {
      this.companyDataService.getCompanyById(this.id).subscribe((response) => {
        this.lists = response['result'];
        this.lists.logo = 'http://localhost:3200/' + response['result'].image;
      });
    }
  }

  // on dropdown state value change related city store on cities and show city drop down
  onStateChange(count) {
    this.cities = this.stateList.find((con) => con.name == count).cities;
  }

  onFileSelected(event) {
    this.selectFile = <File>event.target.files[0];
  }

  // show error for input fields
  errorShowMsg(err) {
    this.isError = true;
    this.errorMessage = `${err} can not be empty`;
    return false;
  }

  // check input email is valid or not
  isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  // check input pnone number is valid or not
  isPhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
  }

  //  validation of inputs
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

  // on submit form 1st check all input fields is not empty
  // for multipart/form use FormData which store key value pair
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

      // if id is -1 then create new company with form data
      // else update existing company detail
      if (+this.id === -1) {
        this.companyDataService.createCompany(fd).subscribe(
          (response) => {
            window.scrollTo(0, 0);
            this.isSuccess = true;
            this.successMessage = response['message'];
            setTimeout(() => {
              this.router.navigate(['/lists']);
            }, 1000);
          },
          (error) => {
            this.isError = true;
            this.errorMessage = error['error'].error;
          }
        );
      } else {
        this.companyDataService.updateCompany(this.id, fd).subscribe(
          (response) => {
            window.scrollTo(0, 0);
            this.isSuccess = true;
            this.successMessage = response['message'];
            setTimeout(() => {
              this.router.navigate(['/lists']);
            }, 1000);
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
