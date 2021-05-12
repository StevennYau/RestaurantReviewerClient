import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingUserService {
  private username: any = undefined;

  constructor() { }


  // tslint:disable-next-line:typedef
  setUsername(username: string){
    this.username = username;
  }

  getUsername(): string{
    return this.username;
  }
}
