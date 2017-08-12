import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { CommentService } from './shared/comment.service';

@Component({
    templateUrl: 'comment.component.html'
})

export class CommentPage {
    post: any;
    postComments: any[];
    newCommentImg: string;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController,
         private commentService: CommentService, private navParams: NavParams,
         private camera: Camera){}
    
    ionViewWillLoad(){
        this.post = this.navParams.get('post');
        this.commentService.getComments(this.post._id).subscribe(
            response => {
                this.postComments = response;
            },
            err => this.failAlert(err)
        )
    }

    takePhoto(){
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.newCommentImg = base64Image;
        }, (err) => {
            this.failAlert(err);
        });
    }

    submitComment(formValues){
        console.log(formValues);
        formValues["postId"] = this.post._id;
        if(this.newCommentImg){
            console.log("submitting photo comment");
            this.commentService.postPictureComment(formValues, this.newCommentImg).subscribe(
                resp => {
                    this.postComments.push(resp);
                    this.newCommentImg = "";
                },
                err => this.failAlert(err)
            )
        }else{
            console.log("submitting text comment");
            this.commentService.postTextComment(formValues).subscribe(
                resp => {
                    this.postComments.push(resp);
                },
                err => this.failAlert(err)
            )
        }
    }

    deleteComment(comment, index){
        this.postComments.splice(index, 1);
        this.commentService.deleteComment(comment).subscribe(
            resp => {},
            err => this.failAlert(err)
        )
    }

    reportComment(comment, index){
        this.postComments.splice(index, 1);
        this.commentService.reportComment(comment).subscribe(
            resp => {},
            err => this.failAlert(err)
        )
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