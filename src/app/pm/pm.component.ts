import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.scss']
})
export class PmComponent implements OnInit {
  // @ts-ignore
  board: string;
  // @ts-ignore
  errorMessage: string;

  constructor(private userService: UserService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.userService.getPMBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
}
