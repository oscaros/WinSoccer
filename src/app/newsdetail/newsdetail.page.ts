import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.page.html',
  styleUrls: ['./newsdetail.page.scss'],
})
export class NewsdetailPage implements OnInit {
  data: any [];
  toValue: any;
  fromValue: any;


  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, public sanitizer: DomSanitizer, private InAppBrowser: InAppBrowser ) {
     // userParams is an object we have in our nav-parameters
  //  this.navParams.get('userParams');
  //  }
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
  }

  ngOnInit() {
    this.storage.get('name').then((val) => {
      console.log('Your name is', val);
      this.data = val;
   
      //alert(this.data)
      //alert(val)
    });

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

  openWebPage(url: String){
    // const options: InAppBrowserOptions = {
    //   zoom = 'no'
    // }
    const browser = this.InAppBrowser.create(url, '_blank', 'hardwareback=yes,directories=no,titlebar=no,toolbar=no,hardwareback=yes,location=no,status=no,menubar=no,scrollbars=no,resizable=no');
  }

}
