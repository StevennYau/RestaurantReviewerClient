import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Business } from '../entities/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getBusiness(): Observable<Business[]> {
     return this.http.get<Business[]>(`${this.apiServerUrl}/businesses`);
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
