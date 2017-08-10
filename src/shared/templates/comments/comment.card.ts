import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CommentService } from '../../../pages/comments/shared/comment.service';
import { ProfilePage } from '../../../pages/profile/profile.component';

@Component({
    selector: 'comment-card',
    templateUrl: 'comment.card.html'
})
export class CommentCardComponent{
    @Input() Comment: any;
    likeColor: string;

    constructor(private commentService: CommentService, private navCtrl: NavController){}

    ngOnInit(){
        if(this.Comment.likedByUser){
            this.likeColor = 'primary';
        }else{
            this.likeColor = 'dark';
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

    viewProfile(){
        this.navCtrl.push(ProfilePage, {user: this.Comment.commenter});
    }
}
