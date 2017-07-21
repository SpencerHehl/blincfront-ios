import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AuthService } from '../../shared/services/auth.service';

import { LoginModal } from '../../shared/modals/login.modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private authService: AuthService) {}

  login(){
    let loginModal = this.modalCtrl.create(LoginModal);
    loginModal.present();
  }

}
