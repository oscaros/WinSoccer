import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular'
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  arrayNewsFeed: any[];
  arrayVideoFeed: any[];
  //  NewsAPI = require('newsapi');
  sourcesArray = ["goal.com", "football365.com", "101greatgoals.com", "fourfourtwo.com",
    "teamtalk.com", "90min.in", "soccernews.com", "caughtoffside.com", "sportslens.com",
    "arseblog.com"]

  toValue: any;
  fromValue: any;

  // user = {
  //   name: 'Simon Grimm',
  //   website: 'www.ionicacademy.com',
  //   address: {
  //     zip: 48149,
  //     city: 'Muenster',
  //     country: 'DE'
  //   },
  //   interests: [
  //     'Ionic', 'Angular', 'YouTube', 'Sports'
  //   ]
  // };


  // current= new Date('2011/05/24');
  // url = 'https://newsapi.org/v2/everything?q=soccer&sources=bbc-sport,four-four-two,talksport&from=2019-11-14&to=2019-11-14&sortBy=popularity&language=en&apiKey=bb27f1860f904aa681bb7bb4f478db50'
  url = 'https://newsapi.org/v2/everything?domains='
  //urlend= '&from='+today1+'&to='+today1+'&sortBy=popularity&language=en&apiKey=bb27f1860f904aa681bb7bb4f478db50'
  urlend = '&from=' + this.fromValue + '&to=' + this.toValue + '&sortBy=publishedAt&language=en&apiKey=bb27f1860f904aa681bb7bb4f478db50'

  constructor(public http: HttpClient, public sanitizer: DomSanitizer, public navCtrl: NavController, private router: Router, private storage: Storage, private network: Network) {
    // watch network for a disconnection
let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
});

// stop disconnect watch
disconnectSubscription.unsubscribe();


// watch network for a connection
let connectSubscription = this.network.onConnect().subscribe(() => {
  console.log('network connected!');
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      console.log('we got a wifi connection, woohoo!');
    }
  }, 3000);
});

// stop connect watch
connectSubscription.unsubscribe();


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

//subscribe to the news feed
    var i: number;
    for (i = 0; i < this.sourcesArray.length; i++) {
      this.getNewsFeed(this.sourcesArray[i]).subscribe(res => {
        if (res.error) throw new Error(res.error);
        else {
          if (res.articles == null) {

          } else {
            this.arrayNewsFeed = res.articles.concat(this.arrayNewsFeed)
          }
        }
        console.log(res);

      })
    }

     //subscribe to the video feed
     this.getVideoFeed().subscribe(res => {
      if (res.error) throw new Error(res.error);
      else {
        if (res == null) {
        } else {
          this.arrayVideoFeed = res.concat(this.arrayVideoFeed)
        }
      }
      console.log(res);
    })
   

  } //end constructor

 


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

  async viewDetail(title, publishedAt, description, content, urlToImage, url, source) {    
     // set a key/value    
     var detail = [
     {
      title: title,
      publishedAt: publishedAt,
      description: description,
      content: content,
      urlToImage: urlToImage,
      url: url,
      source: source
    },   
  ];        
     this.storage.set('name', detail);
     this.navCtrl.navigateRoot('newsdetail');

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

//handlers for pull to refresh
ionRefresh(event) {
  console.log('Pull Event Triggered!');
  setTimeout(() => {
//subscribe to the news feed
    var i: number;
    for (i = 0; i < this.sourcesArray.length; i++) {
      this.getNewsFeed(this.sourcesArray[i]).subscribe(res => {
        if (res.error) throw new Error(res.error);
        else {
          if (res.articles == null) {

          } else {
            this.arrayNewsFeed.length = 0;
            this.arrayNewsFeed = res.articles.concat(this.arrayNewsFeed)
          }
        }
        console.log(res);

      })
    }

    console.log('Async operation has ended');
    //complete()  signify that the refreshing has completed and to close the refresher
    event.target.complete();
  }, 2000);
}
ionPull(event){
//Emitted while the user is pulling down the content and exposing the refresher.
console.log('ionPull Event Triggered!');
}
ionStart(event){
//Emitted when the user begins to start pulling down.
console.log('ionStart Event Triggered!');
}
}
