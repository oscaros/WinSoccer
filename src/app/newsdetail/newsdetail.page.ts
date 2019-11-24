import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.page.html',
  styleUrls: ['./newsdetail.page.scss'],
})
export class NewsdetailPage implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute, private router: Router ) {
     // userParams is an object we have in our nav-parameters
  //  this.navParams.get('userParams');
  //  }
  }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
      console.log(this.data.name)
    }
  }

}
