import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

import { CommentService } from '../../services/comment.service';

@Component({
    templateUrl: 'post-form.modal.html'
})
export class CommentFormModal {
    imageData: any;
    postType: any;

    constructor(private commentService: CommentService, private navParams: NavParams,
        private viewCtrl: ViewController, public alertCtrl: AlertController){
            this.postType = this.navParams.get('postType');
            if(this.postType == 'photo'){
                this.imageData = this.navParams.get('image');
            }
        }

    submitPost(formValues){
        console.log(formValues);
        if(this.postType == 'text'){
            this.commentService.postTextComment(formValues).subscribe(
                response => {
                    this.viewCtrl.dismiss(response);
                },
                err => this.failAlert(err)
            );
        }else{
            this.commentService.postPictureComment(formValues, this.imageData).subscribe(
                response => {
                    this.viewCtrl.dismiss(response);
                },
                err => this.failAlert(err)
            );
        }
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