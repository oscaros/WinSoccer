import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.page.html',
  styleUrls: ['./newsdetail.page.scss'],
})
export class NewsdetailPage implements OnInit {
  data: any [];

  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, public sanitizer: DomSanitizer ) {
     // userParams is an object we have in our nav-parameters
  //  this.navParams.get('userParams');
  //  }
  }

  ngOnInit() {
    this.storage.get('name').then((val) => {
      console.log('Your name is', val);
      this.data = val;
   
      //alert(this.data)
      //alert(val)
    });

    var markup = document.documentElement.innerHTML;
    alert(markup);

    //alert(this.data.toString)
  }

}
