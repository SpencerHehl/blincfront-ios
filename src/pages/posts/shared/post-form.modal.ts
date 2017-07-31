import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

import { PostService } from './post.service';

@Component({
    templateUrl: 'post-form.modal.html'
})
export class PostFormModal {
    constructor(private postService: PostService, private navParams: NavParams, private viewCtrl: ViewController, public alertCtrl: AlertController){}

    postComment(formValues){
        console.log(formValues);
        this.postService.postText(formValues).subscribe(
            response => {
                this.viewCtrl.dismiss();
            },
            err => this.failAlert(err)
        );
    }

    cancel(){
        this.viewCtrl.dismiss();
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