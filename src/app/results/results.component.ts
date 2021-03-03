import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {BusinessService} from '../services/business.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private businessService: BusinessService) { }

  business: Observable<any> | undefined;
  // public id: number | undefined;
  public businessId: string | null | undefined;


  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params) => {
          console.log(params.get('id'));
          this.businessId = params.get('id');

        }
      );



  }

}
