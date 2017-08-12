import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, ActionSheetController, AlertController } from 'ionic-angular';

import { CommentService } from '../../../pages/comments/shared/comment.service';
import { AuthService } from '../../services/auth.service';
import { ProfilePage } from '../../../pages/profile/profile.component';

@Component({
    selector: 'comment-card',
    templateUrl: 'comment.card.html'
})
export class CommentCardComponent{
    @Input() Comment: any;
    @Output() deleteEmitter = new EventEmitter();
    @Output() reportEmitter = new EventEmitter();
    likeColor: string;
    isActiveUser: boolean;

    constructor(private commentService: CommentService, private navCtrl: NavController,
         private actionSheetCtrl: ActionSheetController, private authService: AuthService,
         private alertCtrl: AlertController){}

    ngOnInit(){
        if(this.Comment.likedByUser){
            this.likeColor = 'primary';
        }else{
            this.likeColor = 'dark';
        }
        if(this.Comment.commenter._id == this.authService.mongoUser._id){
            this.isActiveUser = true;
        }else{
            this.isActiveUser = false;
        }
    }

    likeComment(commentId){
        this.Comment.likedByUser = !this.Comment.likedByUser;
        if(this.Comment.likedByUser){
            this.Comment.numLikes += 1;
            this.likeColor = 'primary';
            this.commentService.likeComment(commentId).subscribe(
                response => {}
            )
        }else{
            this.Comment.numLikes -= 1;
            this.likeColor = 'dark';
            this.commentService.unlikeComment(commentId).subscribe(
                response => {}
            )
        }
    }

    viewMore(){
        if(this.isActiveUser){
            let actionSheet = this.actionSheetCtrl.create({
                title: 'More',
                buttons: [
                    {
                    text: 'Delete Comment',
                    role: 'destructive',
                    handler: () => {
                        this.confirmDelete();
                    } 
                    },{
                        text: 'Flag as Inappropriate',
                        handler: () => {
                            this.confirmReport();
                        }
                    },{
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            actionSheet.dismiss();
                        }
                    }
                ]
            });
            actionSheet.present();
        }else{
            let actionSheet = this.actionSheetCtrl.create({
                title: 'More',
                buttons: [
                    {
                        text: 'Flag as Inappropriate',
                        handler: () => {
                            this.confirmReport();
                        }
                    },{
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            actionSheet.dismiss();
                        }
                    }
                ]
            });
            actionSheet.present();
        }
    }

    deleteComment(){
        this.deleteEmitter.emit(this.Comment);
    }

    reportComment(){
        this.Comment.isFlagged = true;
        this.reportEmitter.emit(this.Comment);
    }

    confirmDelete(){
        let confirmAlert = this.alertCtrl.create({
            title: 'Confirm',
            subTitle: 'Are you sure you want to delete this comment?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.deleteComment();
                    } 
                },
                {
                    text: 'No',
                    handler: () => {
                        confirmAlert.dismiss();
                    }
                }
            ]
        });
        confirmAlert.present();
    }

    confirmReport(){
        let confirmAlert = this.alertCtrl.create({
            title: 'Confirm',
            subTitle: 'Are you sure you want to report this comment?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.reportComment();
                    } 
                },
                {
                    text: 'No',
                    handler: () => {
                        confirmAlert.dismiss();
                    }
                }
            ]
        });
        confirmAlert.present();
    }

    viewProfile(){
        this.navCtrl.push(ProfilePage, {user: this.Comment.commenter});
    }
}
