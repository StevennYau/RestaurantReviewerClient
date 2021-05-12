import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Business} from '../entities/business';
import {Address} from '../entities/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getBusinessById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiServerUrl}/getAddressById/${id}`);
  }
}
