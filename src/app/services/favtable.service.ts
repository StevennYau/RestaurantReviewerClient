import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Business } from '../entities/business';
import { FavTable } from '../entities/favTable';
import {PostRow} from '../entities/postRow';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavtableService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  // tslint:disable-next-line:typedef
  public AddFavRow(row: PostRow): Observable<FavTable> {
    console.log('in add fav row');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<FavTable>('http://localhost:8181/addFav', row, httpOptions);
  }

  public updateFavRow(row: FavTable): Observable<FavTable> {
    return this.http.put<FavTable>(`${this.apiServerUrl}/updateFavRow`, row);
  }

  public deleteFavRow(rowId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteFavRowById/${rowId}`);
  }
}
