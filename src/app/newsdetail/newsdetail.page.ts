import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.page.html',
  styleUrls: ['./newsdetail.page.scss'],
})
export class NewsdetailPage implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage ) {
     // userParams is an object we have in our nav-parameters
  //  this.navParams.get('userParams');
  //  }
  }

  ngOnInit() {
    this.storage.get('name').then((val) => {
      console.log('Your name is', val);
      this.data = val;
    });
  }

}
