import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-home-test',
  templateUrl: './home-test.component.html',
  styleUrls: ['./home-test.component.scss']
})
export class HomeTestComponent implements OnInit {

  info: any;

  constructor(private token: TokenStorageService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.token.signOut();
    window.location.reload();
  }

}
