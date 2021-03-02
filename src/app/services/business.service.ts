import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Business } from '../entities/business';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/position/scroll-clip';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  test: string | undefined;

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getBusiness(): Observable<Business[]> {
     return this.http.get<Business[]>(`${this.apiServerUrl}/businesses`);
  }

  public getBusinessByName(name: string): Observable<Business[]> {
    console.log('NAME NAME = ' + name);
    // tslint:disable-next-line:new-parens
    this.test = JSON.stringify(name);
    console.log(this.test);
    console.log(this.test.substring(11, this.test.length - 2));

    return this.http.get<Business[]>(`${this.apiServerUrl}/businessByName/${name}`);
  }

  public addBusiness(business: Business): Observable<Business> {
     return this.http.post<Business>(`${this.apiServerUrl}/addBusiness`, business);
  }

  public updateBusiness(business: Business): Observable<Business> {
     return this.http.put<Business>(`${this.apiServerUrl}/updateBusiness`, business);
  }

  public deleteBusiness(businessId: number): Observable<void> {
     return this.http.delete<void>(`${this.apiServerUrl}/deleteBusiness/${businessId}`);
  }


}
