import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  arrayVideoFeed: any [];
  //  NewsAPI = require('newsapi');
  sourcesArray=[ "bbc-sport", "four-four-two", "talksport", "the-sport-bible"]
  

 // url = 'https://newsapi.org/v2/everything?q=soccer&sources=bbc-sport,four-four-two,talksport&from=2019-11-14&to=2019-11-14&sortBy=popularity&language=en&apiKey=bb27f1860f904aa681bb7bb4f478db50'
  url = 'https://newsapi.org/v2/everything?q=news&sources='
  urlend= '&from=2019-11-13&to=2019-11-14&sortBy=popularity&language=en&apiKey=bb27f1860f904aa681bb7bb4f478db50'

  constructor(public http: HttpClient, public sanitizer: DomSanitizer) {
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


    var i: number;
  for (i = 0; i < this.sourcesArray.length; i++) {   
    this.getNewsFeed(this.sourcesArray[i]).subscribe(res=>{
      if (res.error) throw new Error(res.error);
      else{
        if (res.articles == null){

        }else{
          this.arrayVideoFeed = res.articles.concat(this.arrayVideoFeed)
        }

        
      }
      
      
    
      console.log(res);
      
    })   
  }
  }

  getVideoFeed(): Observable<any>{  
     let host = "free-football-soccer-videos.p.rapidapi.com"
      let key = "7d4d0b9f01msh989a5287e61be53p111fb1jsn4b5d899df206";
      let headers = new HttpHeaders({'x-rapidapi-host': host, 'x-rapidapi-key': key});   
      return this.http.get('https://free-football-soccer-videos.p.rapidapi.com/', {headers:headers});
   }

   getNewsFeed(source): Observable<any>{  
    let host = "free-football-soccer-videos.p.rapidapi.com"
     let key = "7d4d0b9f01msh989a5287e61be53p111fb1jsn4b5d899df206";
     let headers = new HttpHeaders({'x-rapidapi-host': host, 'x-rapidapi-key': key});  
     console.log(source); 
     return this.http.get(this.url + source + this.urlend);
     
  }

  
  

}
