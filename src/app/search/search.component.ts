import {Component, OnInit} from '@angular/core';
import {Search} from '../entities/search';
import {BusinessService} from '../services/business.service';
import {Business} from '../entities/business';
import {HttpErrorResponse} from '@angular/common/http';
// @ts-ignore
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { ParamMap} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public businesses !: Business[];
  public result: string | undefined;
  public name: string | undefined;


  constructor(private businessService: BusinessService, private router: Router) {
  }


  ngOnInit(): void {
    this.name = 'steven';
  }

  onSelect = (business: Business) => {
    this.router.navigate(['/results'], { queryParams: { id: business.id}});
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
