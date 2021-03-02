import {Component, OnInit} from '@angular/core';
import {Search} from '../entities/search';
import {BusinessService} from '../services/business.service';
import {Business} from '../entities/business';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public businesses !: Business[];
  result: string | undefined;
  counter: number | undefined;

  constructor(private businessService: BusinessService) {
  }


  ngOnInit(): void {
    this.counter = 0;
  }


  submit = (result: string) => {
    console.warn(result);
    this.result = result;
    console.log(this.result);
    this.result = JSON.stringify(result);
    this.result = this.result.substring(11, this.result.length - 2);
    console.log(this.result);

    this.businessService.getBusinessByName(this.result).subscribe(
      (response: Business[]) => {
        this.businesses = response;
        console.log(this.businesses);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }

}
