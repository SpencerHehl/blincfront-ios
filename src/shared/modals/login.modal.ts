import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { FacebookAuth, GoogleAuth, User } from '@ionic/cloud-angular';

import { AuthService } from '../services/auth.service';

@Component({
    templateUrl: 'login.modal.html'
})
export class LoginModal {
    constructor(public alertCtrl: AlertController, private authService: AuthService, private NavParams: NavParams, public viewController: ViewController, public googleAuth: GoogleAuth, public user: User, public facebookAuth: FacebookAuth){}

    facebookLogin(){
        this.facebookAuth.login().then((res) => {
            if(res.signup){
                this.authService.newUser(this.user.social.facebook.data).subscribe(
                    () => this.viewController.dismiss()
                );
            }else{
                this.authService.login(this.user.social.facebook.data);
                this.viewController.dismiss();
            }
        });
    }

    googleLogin(){
        this.googleAuth.login().then((res) =>{
            if(res.signup){
                this.authService.newUser(this.user.social.google.data).subscribe(
                    response => this.failAlert(response),
                    err => this.failAlert(err),
                    () => this.viewController.dismiss()
                );
            }else{
                this.authService.login(this.user.social.google.data);
                this.viewController.dismiss();
            }
        });
    }

    cancel(){
        this.viewController.dismiss();
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