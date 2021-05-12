import {Component, OnInit} from '@angular/core';
import {Search} from '../entities/search';
import {BusinessService} from '../services/business.service';
import {Business} from '../entities/business';
import {HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import {DialogOverviewComponent, HomeComponent} from '../home/home.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FavTable} from '../entities/favTable';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FavtableService} from '../services/favtable.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public businesses !: Business[];
  public result: string | undefined;
  public COLUMN = [1, 2, 3];
  favTables: FavTable[];
  info: any;
  user: any;

  // tslint:disable-next-line:variable-name
  constructor(private businessService: BusinessService, private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar,
              private favTableService: FavtableService, private token: TokenStorageService, private userService: UserService) {
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.user = await this.userService.getUser(this.info.username);
    this.favTables = await this.userService.getFavTable(this.info.username);
  }

  onSelect = (business: Business) => {
    this.router.navigate(['/results'], { queryParams: { id: business.id}});
  }

  submit = (result: string) => {
    console.log(result);
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


  // tslint:disable-next-line:typedef
  openModal(business: any) {
    console.log('in modal');
    console.log(business);
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data: {business, userRating: 5}
    });
    dialogRef.afterClosed().subscribe(result => {
      let alreadyExists = false;
      for (const fav of this.favTables) {
        console.log(fav);
        if (fav.business_id === business.id) {
          alreadyExists = true;
        }
      }
      if (result > 0 && result <= 5 && alreadyExists === false) {
        console.log(`result: ${result}`);
        this.favTableService.AddFavRow({
            business_id: business.id,
            user_id: this.user.id,
            user_rating: result
          }
          // tslint:disable-next-line:no-shadowed-variable
        ).subscribe(result => console.log(result));
        window.location.reload();
      } else if (alreadyExists) {
        this.openSnackBar('Error: You have already rated this restaurant, go to the "Users" tab to update rating');
      } else {
        console.log('Error, rating was not from 1 - 5');
        this.openSnackBar('Error: Rating was not from 1 - 5');
      }
    });
  }

  // tslint:disable-next-line:typedef
  openSnackBar(message: string) {
    this._snackBar.open(message, '' , {
      duration: 2000,
    });
  }
}
