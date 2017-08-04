import { Component } from '@angular/core';
import { NavParams, AlertController, NavController } from 'ionic-angular';
import { FacebookAuth, GoogleAuth, User } from '@ionic/cloud-angular';

import { AuthService } from '../../shared/services/auth.service';
import { TabsPage } from '../tabs/tabs';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginPage {
    constructor(public alertCtrl: AlertController, private authService: AuthService,
        private NavParams: NavParams, private user: User, public navController: NavController,
        private facebookAuth: FacebookAuth, private googleAuth: GoogleAuth){}

    ionViewWillLoad(){
        if(this.facebookAuth.getToken()){
            this.authService.authMethod = "facebook";
            this.authService.currentUser = this.user.social.facebook.data;
            this.navController.setRoot(TabsPage);
        }else if(this.googleAuth.getToken()){
            this.authService.authMethod = "google";
            this.authService.currentUser = this.user.social.google.data;
            this.navController.setRoot(TabsPage);
        }
    }

    facebookLogin(){
        this.facebookAuth.login().then((result) =>{
            this.facebookAuth.storeToken(result.token);
            this.authService.authMethod = "facebook";
            this.authService.currentUser = this.user.social.facebook.data;
            if(result.signup){
                this.authService.newUser(this.user.social.facebook.data).subscribe(
                    response => this.failAlert(response),
                    err => this.failAlert(err),
                    () => this.navController.setRoot(TabsPage)
                );
            }
        });
    }

    googleLogin(){
        this.googleAuth.login().then((result) =>{
            this.googleAuth.storeToken(result.token);
            this.authService.authMethod = "google";
            this.authService.currentUser = this.user.social.google.data;
            if(result.signup){
                this.authService.newUser(this.user.social.google.data).subscribe(
                    response => this.failAlert(response),
                    err => this.failAlert(err),
                    () => this.navController.setRoot(TabsPage)
                );
            }
        });
    }

    failAlert(message){
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
}