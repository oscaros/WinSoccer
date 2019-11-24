import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular'
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  arrayVideoFeed: any[];
  //  NewsAPI = require('newsapi');
  sourcesArray = ["goal.com", "football365.com", "101greatgoals.com", "fourfourtwo.com",
    "teamtalk.com", "90min.in", "soccernews.com", "caughtoffside.com", "sportslens.com",
    "arseblog.com"]

  toValue: any;
  fromValue: any;

  user = {
    name: 'Simon Grimm',
    website: 'www.ionicacademy.com',
    address: {
      zip: 48149,
      city: 'Muenster',
      country: 'DE'
    },
    interests: [
      'Ionic', 'Angular', 'YouTube', 'Sports'
    ]
  };


  // current= new Date('2011/05/24');
  // url = 'https://newsapi.org/v2/everything?q=soccer&sources=bbc-sport,four-four-two,talksport&from=2019-11-14&to=2019-11-14&sortBy=popularity&language=en&apiKey=bb27f1860f904aa681bb7bb4f478db50'
  url = 'https://newsapi.org/v2/everything?domains='
  //urlend= '&from='+today1+'&to='+today1+'&sortBy=popularity&language=en&apiKey=bb27f1860f904aa681bb7bb4f478db50'
  urlend = '&from=' + this.fromValue + '&to=' + this.toValue + '&sortBy=publishedAt&language=en&apiKey=bb27f1860f904aa681bb7bb4f478db50'

  constructor(public http: HttpClient, public sanitizer: DomSanitizer, public navCtrl: NavController, private router: Router, private dataService: DataService) {
    // const newsapi = this.NewsAPI('bb27f1860f904aa681bb7bb4f478db50');

    // newsapi.v2.everything({
    //   q: 'bitcoin',
    //   sources: 'bbc-news,the-verge',
    //   domains: 'bbc.co.uk, techcrunch.com',
    //   from: '2017-12-01',
    //   to: '2017-12-12',  
    //   language: 'en',
    //   sortBy: 'relevancy',
    //   page: 2
    // }).then(response => {
    //   console.log(response);

    // });

    today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    this.toValue = today;


    today = new Date();
    var dd = String(today.getDate() - 2).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    this.fromValue = today;


    /* today = new Date();
   dd = String(today.getDate()).padStart(2, '0');
   mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   yyyy = today.getFullYear();  
   today = yyyy + '-' + mm + '-' + dd;
   console.log(today);*/
    //today1 = today;


    var i: number;
    for (i = 0; i < this.sourcesArray.length; i++) {
      this.getNewsFeed(this.sourcesArray[i]).subscribe(res => {
        if (res.error) throw new Error(res.error);
        else {
          if (res.articles == null) {

          } else {
            this.arrayVideoFeed = res.articles.concat(this.arrayVideoFeed)
          }
        }
        console.log(res);

      })
    }
  }

  getVideoFeed(): Observable<any> {
    let host = "free-football-soccer-videos.p.rapidapi.com"
    let key = "7d4d0b9f01msh989a5287e61be53p111fb1jsn4b5d899df206";
    let headers = new HttpHeaders({ 'x-rapidapi-host': host, 'x-rapidapi-key': key });
    return this.http.get('https://free-football-soccer-videos.p.rapidapi.com/', { headers: headers });
  }

  getNewsFeed(source): Observable<any> {
    let host = "NewsAPIraygorodskijV1.p.rapidapi.com"
    let key = "7d4d0b9f01msh989a5287e61be53p111fb1jsn4b5d899df206";
    let headers = new HttpHeaders({ 'x-rapidapi-host': host, 'x-rapidapi-key': key });
    console.log(source);
    return this.http.get(this.url + source + this.urlend);

  }

  viewDetail(title, publishedAt, description,content, urlToImage, url, source) {
    console.log(source)
    //this.navCtrl.navigateRoot('newsdetail');

    this.dataService.setData(42, this.user);
    this.router.navigateByUrl('/newsdetail/42');
  }

  public timeDifference(previous) {    

    var myDate = new Date();
    var current1 = myDate.getTime();

    var myDate = new Date(previous);
    var previous1 = myDate.getTime();

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current1 - previous1;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }



}
