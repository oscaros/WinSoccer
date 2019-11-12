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

  constructor(public http: HttpClient, public sanitizer: DomSanitizer) {
    this.getVideoFeed().subscribe(res=>{
      if (res.error) throw new Error(res.error);
      else{this.arrayVideoFeed = res};
      console.log(this.arrayVideoFeed[0].embed)
      var xx = this.arrayVideoFeed[0].embed;
      console.log(xx.substring(13, 57))
      //console.log(res);
      
    })   
  }

  getVideoFeed(): Observable<any>{  
     let host = "free-football-soccer-videos.p.rapidapi.com"
      let key = "7d4d0b9f01msh989a5287e61be53p111fb1jsn4b5d899df206";
      let headers = new HttpHeaders({'x-rapidapi-host': host, 'x-rapidapi-key': key});   
      return this.http.get('https://free-football-soccer-videos.p.rapidapi.com/', {headers:headers});
   }
  

}
