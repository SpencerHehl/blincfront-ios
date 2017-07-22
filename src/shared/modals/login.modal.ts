import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FacebookAuth, GoogleAuth, User } from '@ionic/cloud-angular';

import { AuthService } from '../services/auth.service';

@Component({
    templateUrl: 'login.modal.html'
})
export class LoginModal {
    currUser: any;
    constructor(private authService: AuthService, private NavParams: NavParams, public viewController: ViewController, public googleAuth: GoogleAuth, public user: User, public facebookAuth: FacebookAuth){}

    facebookLogin(){
        this.facebookAuth.login().then((res) => {
            this.authService.currentUser = this.user.social.facebook.data;
            this.viewController.dismiss();
        });
    }

    googleLogin(){
        this.googleAuth.login().then((res) =>{
            this.authService.currentUser = this.user.social.google.data;
            this.viewController.dismiss();
        });
    }

    cancel(){
        this.viewController.dismiss();
    }
}