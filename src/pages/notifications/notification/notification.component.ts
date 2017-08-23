import { Component } from '@angular/core';
import { NavParams, AlertController, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { CommentService } from '../../comments/shared/comment.service';
import { PostService } from '../../../shared/services/post.service';
import { NotificationService } from '../../../shared/services/notifications.service';
import { AuthService } from '../../../shared/services/auth.service';
import { TabsPage } from '../../tabs/tabs';

@Component({
    templateUrl: "notification.component.html"
})
export class NotificationPage{
    post: any;
    comments: any[];
    newCommentImg: string;

    constructor(private commentService: CommentService, private postService: PostService,
         private notificationService: NotificationService, private navParams: NavParams,
         private alertCtrl: AlertController, private camera: Camera,
         private authService: AuthService, private navCtrl: NavController){}

    ionViewWillLoad(){
        this.post = this.navParams.get('post');
        this.comments = this.navParams.get('comments');
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
                    this.comments.push(resp);
                    this.newCommentImg = "";
                },
                err => this.failAlert(err)
            )
        }else{
            console.log("submitting text comment");
            this.commentService.postTextComment(formValues).subscribe(
                resp => {
                    this.comments.push(resp);
                },
                err => this.failAlert(err)
            )
        }
    }

    reportPostDate(post, index){
        this.postService.reportPost(post).subscribe(
            resp => {
                this.navCtrl.setRoot(TabsPage);
            },
            err => this.failAlert(err)
        )
    }

    deletePostDate(post, index){
        this.postService.deletePost(post).subscribe(
            resp => {
                this.navCtrl.setRoot(TabsPage);
            },
            err => this.failAlert(err)
        )
    }

    deleteComment(comment, index){
        this.comments.splice(index, 1);
        this.commentService.deleteComment(comment).subscribe(
            resp => {},
            err => this.failAlert(err)
        )
    }

    reportComment(comment, index){
        this.comments.splice(index, 1);
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