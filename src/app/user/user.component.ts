import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {SharingUserService} from '../services/sharing-user.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {FavTable} from '../entities/favTable';
import {BusinessService} from '../services/business.service';
import {Business} from '../entities/business';
import {FavBusiness} from '../entities/favBusiness';
import {Observable} from 'rxjs';
import {DialogOverviewComponent} from '../home/home.component';
import {Router} from '@angular/router';
import {FavtableService} from '../services/favtable.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private sharingService: SharingUserService, private token: TokenStorageService,
              // tslint:disable-next-line:variable-name
              private router: Router, private favTableService: FavtableService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  // @ts-ignore
  board: string;
  // @ts-ignore
  errorMessage: string;
  username: string;
  user: any;
  favTables: FavTable[];
  businesses: Business[];
  concatedTable: any[];
  concatFav: any[];
  concatBuss: any[];

  displayedColumns: string[] = ['name', 'user_rating', 'update', 'remove'];

// tslint:disable-next-line:typedef
  async ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.board = data;
        console.log(data);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );

    this.username = this.token.getUsername();

    this.user = await this.userService.getUser(this.username);
    this.favTables = await this.userService.getFavTable(this.username);

    this.businesses = await this.userService.getBusinesses(this.username);
    console.log(this.businesses[0].name);
    console.log(this.favTables);

    this.concatFav = this.favTables;
    this.concatBuss = this.businesses;
    this.concatedTable = this.concatFav.concat(this.concatBuss);
    for (let i = 0; i < this.concatFav.length; i++) {
      console.log(this.concatFav[i]);
      this.concatFav[i].name = this.concatBuss[i].name;
      this.concatFav[i].remove = '';
      this.concatFav[i].update = '';
    }
    console.log(this.concatedTable);
    console.log(this.concatFav);
  }

  // tslint:disable-next-line:typedef
  openInfo(businessId: number) {
    console.log(businessId);
    this.router.navigate(['/results'], { queryParams: { id: businessId}});
  }

  // tslint:disable-next-line:typedef variable-name
  removeRow(fav_id: any) {
    this.favTableService.deleteFavRow(fav_id).subscribe();
    window.location.reload();
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
      if (result > 0 && result <= 5) {
        console.log(`result: ${result}`);
        this.favTableService.updateFavRow({
          fav_id: business.fav_id,
          business_id: business.business_id,
          user_id: this.user.id,
          user_rating: result
        }).subscribe();
        window.location.reload();
      } else {
        console.log('Error, rating was not from 1 - 5');
        this.openSnackBar('Error: Rating was not from 1 - 5');
      }
    });
  }

  // tslint:disable-next-line:typedef
  updateRow(row: any) {
    this.favTableService.updateFavRow({
      fav_id: row.fav_id,
      business_id: row.business_id,
      user_id: this.user.id,
      user_rating: 3
    });
  }

  // tslint:disable-next-line:typedef
  openSnackBar(message: string) {
    this._snackBar.open(message, '' , {
      duration: 2000,
    });
  }
}
