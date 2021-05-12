import { Business } from './../entities/business';
import { BusinessService } from './../services/business.service';
import {Component, Inject, OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { SharingUserService } from '../services/sharing-user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FavtableService} from '../services/favtable.service';
import {UserService} from '../services/user.service';
import {FavTable} from '../entities/favTable';

export interface DialogData {
  business: Business;
  userRating: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public businesses !: Business[];
  info: any;
  user: any;
  favTables: FavTable[];

  constructor(private businessService: BusinessService, private router: Router, private token: TokenStorageService,
              private sharingService: SharingUserService, public dialog: MatDialog, private _snackBar: MatSnackBar,
              private favTableService: FavtableService, private userService: UserService) { }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.getBusinesses();
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.sharingService.setUsername(this.info.username);
    this.user = await this.userService.getUser(this.info.username);
    this.favTables = await this.userService.getFavTable(this.info.username);
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

  onSelect = (business: Business) => {
    this.router.navigate(['/results'], { queryParams: { id: business.id}});
  }

  public openModal = (business: Business) => {
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
  logout() {
    this.token.signOut();
    window.location.reload();
  }

  // tslint:disable-next-line:typedef
  openSnackBar(message: string) {
    this._snackBar.open(message, '' , {
      duration: 2000,
    });
  }

}

@Component({
  selector: 'app-modal-dialog',
  templateUrl: 'modal-dialog.html',
})
export class DialogOverviewComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
