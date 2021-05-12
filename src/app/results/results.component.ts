import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {BusinessService} from '../services/business.service';
import {Business} from '../entities/business';
import {HttpErrorResponse} from '@angular/common/http';
import {AddressService} from '../services/address.service';
import {Address} from '../entities/address';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit{

  constructor(private route: ActivatedRoute, private businessService: BusinessService, private addressService: AddressService) { }
  public business !: Business;
  public businessId: string | null | undefined;
  public businessAddress !: Address;
  public lng = 0;
  public lat = 0;

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params) => {
          console.log(params.get('id'));
          this.businessId = params.get('id');
        }
      );

    if (this.businessId != null) {
      // tslint:disable-next-line:radix
      this.businessService.getBusinessById(parseInt(this.businessId)).subscribe(
        (response: Business) => {
          this.business = response;
          console.log(this.business);

          // tslint:disable-next-line:radix
          this.addressService.getBusinessById(this.business.address_id).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            (response: Address) => {
              this.businessAddress = response;
              console.log(this.businessAddress);
              if (this.lng != null) {
                this.lng = this.businessAddress.longitude;
              }
              if (this.lat != null) {
                this.lat = this.businessAddress.latitude;
              }

              console.log('INSIDE INIT: ' + this.lng + ' ' + this.lat);
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
          );

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    }
  }

}
