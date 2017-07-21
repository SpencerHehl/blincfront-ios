import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { AuthService } from '../services/auth.service';

@Component({
    templateUrl: 'login.modal.html'
})
export class LoginModal {
    constructor(private authService: AuthService, private NavParams: NavParams, public viewController: ViewController){}

    facebookLogin(){
        this.authService.facebookLogin();
        this.viewController.dismiss();
    }

    googleLogin(){
        this.authService.googleLogin();
        this.viewController.dismiss();
    }

    cancel(){
        this.viewController.dismiss();
    }
}