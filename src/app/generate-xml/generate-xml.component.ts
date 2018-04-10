import { Component, OnInit } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ContentSourceListService } from '../service/content-source-list.service';
import { CrawlRuleListService } from '../service/crawl-rule-list.service';
import { ContentSource } from '../models/contentSource';
import { CrawlRule } from '../models/crawlRule';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Component({
  selector: 'app-generate-xml',
  templateUrl: './generate-xml.component.html',
  styleUrls: ['./generate-xml.component.scss']
})
export class GenerateXmlComponent implements OnInit {
  ItemsList: any[] = new Array();

  verifyData() {
    var regex = /(<([^>]+)>)|([<>!])/ig;
    this.ItemsList.forEach( el => {
      el.forEach( innerEl => {
        Object.keys(innerEl).forEach( key => {
          if(innerEl[key] && key !== 'Id')
          {
            innerEl[key] = innerEl[key].replace(regex,'');
          }
        }) 
      })
    });
  }

  gatherData() {
    this.ItemsList.length = 0;
    this.ItemsList.push(this.csStore.getItems());
    this.ItemsList.push(this.crStore.getItems());
  }

  onClick() { 
    this.gatherData();
    this.verifyData();
    return this.http.post("/api/post", JSON.stringify(this.ItemsList), httpOptions).subscribe(res => {console.log(res)});
  }

  constructor(private http:HttpClient, private csStore:ContentSourceListService, private crStore:CrawlRuleListService) { }

  ngOnInit() {
  }
}
