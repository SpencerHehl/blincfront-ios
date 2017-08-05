import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../shared/services/auth.service';
import { MyFeedPage } from '../profile/myfeed/myfeed.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private authService: AuthService) {}

  myProfile(){
    this.navCtrl.push(MyFeedPage);
  }
}
