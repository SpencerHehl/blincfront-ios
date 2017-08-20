import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { CommentService } from '../../comments/shared/comment.service';
import { PostService } from '../../../shared/services/post.service';
import { NotificationService } from '../../../shared/services/notifications.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    templateUrl: "notification.component.html"
})
export class NotificationPage{
    type: string;
    commentId: string;
    postId: string;
    post: any;
    comments: any[];

    constructor(private commentService: CommentService, private postService: PostService,
         private notificationService: NotificationService, private navParams: NavParams){}

    ionViewWillLoad(){
        this.type = this.navParams.get('type');
        if(this.type == 'comment'){
            this.commentId = this.navParams.get('commentId');
        }else{
            this.postId = this.navParams.get('postId');
        }
    }
}