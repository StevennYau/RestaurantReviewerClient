import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FavTable} from '../entities/favTable';
import {User} from '../entities/user';
import {BusinessService} from './business.service';
import {Business} from '../entities/business';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8181/api/test/user';
  private pmUrl = 'http://localhost:8181/api/test/pm';
  private adminUrl = 'http://localhost:8181/api/test/admin';
  private userFavTableUrl = 'http://localhost:8181/api/user/favtable';
  private userIdUrl = 'http://localhost:8181/getUserIdByName';

  constructor(private http: HttpClient, private businessService: BusinessService) {
  }

  getUserBoard(): Observable<string> {
    // @ts-ignore
    return this.http.get(this.userUrl, {responseType: 'text'});
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, {responseType: 'text'});
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, {responseType: 'text'});
  }

  getUserFavTable(userId: number): Observable<FavTable[]> {
    return this.http.get<FavTable[]>(`${this.userFavTableUrl}/${userId}`);
  }

  getIdByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.userIdUrl}/${username}`);
  }

  // tslint:disable-next-line:typedef
  async getFavTable(username: string) {
    const receivedUser = await this.getIdByUsername(username).toPromise();
    const userId = receivedUser.id;
    const favTable = await this.getUserFavTable(userId).toPromise();
    console.log(favTable);
    return favTable;
  }

  // tslint:disable-next-line:typedef
  async getBusinesses(username: string) {
    const receivedUser = await this.getIdByUsername(username).toPromise();
    const userId = receivedUser.id;
    const favTable = await this.getUserFavTable(userId).toPromise();
    console.log(favTable);
    const businesses: Business[] = [];
    for (const fav of favTable) {
      console.log(fav.business_id);
      const business = await this.businessService.getBusinessById(fav.business_id).toPromise();
      console.log(business);
      businesses.push(business);
    }
    console.log(businesses);
    return businesses;
  }

  // tslint:disable-next-line:typedef
  async getUser(username: string) {
    try {
      const receivedUser = await this.getIdByUsername(username).toPromise();
      console.log(receivedUser.id);
      return receivedUser;
    } catch (err) {
      return 'Error: ' + err;
    }
  }
}
