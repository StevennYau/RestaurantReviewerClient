import { Business } from './../entities/business';
import { BusinessService } from './../services/business.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public businesses !: Business[];

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
    this.getBusinesses();
  }

  public getBusinesses(): void {
    this.businessService.getBusiness().subscribe(
      (response: Business[]) => {
        this.businesses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
