import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public http: HttpClient) {
    this.saveSelectedToCloud();
  }

  saveToCloud(): Observable<any>{  
     let host = "free-football-soccer-videos.p.rapidapi.com"
      let key = "7d4d0b9f01msh989a5287e61be53p111fb1jsn4b5d899df206";
      let headers = new HttpHeaders({'x-rapidapi-host': host, 'x-rapidapi-key': key});   
      return this.http.get('https://free-football-soccer-videos.p.rapidapi.com/', {headers:headers});
   }
  
  saveSelectedToCloud(){
      this.saveToCloud().subscribe(res=>{
        if (res.error) throw new Error(res.error);
        console.log(res);
      })   
  } 

}
