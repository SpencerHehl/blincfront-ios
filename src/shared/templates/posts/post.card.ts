import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PostService } from '../../../pages/posts/shared/post.service';
import { CommentPage } from '../../../pages/comments/comment.component';
import { MediaService } from '../../services/media.service';

@Component({
    selector: 'post-card',
    templateUrl: 'post.card.html'
})
export class PostCardComponent {
    @Input() Post: any;
    likeColor: string;

    constructor(private postService: PostService, private navCtrl: NavController,
         private navParams: NavParams, private mediaService: MediaService){}

    ngOnInit(){
        if(this.Post.likedByUser){
            this.likeColor = 'primary';
        }else{
            this.likeColor = 'dark';
        }
        if(this.Post.content.contentType == 'photo'){
            this.mediaService.getMedia(this.Post._id).subscribe(
                resp => this.Post.content["img"] = resp,
                err => console.log(err)
            )
        }
    }

    likePost(postId) {
        this.Post.likedByUser = !this.Post.likedByUser;
        if(this.Post.likedByUser){
            this.Post.numLikes += 1;
            this.likeColor = 'primary';
            this.postService.likePost(postId).subscribe(
                response => {}
            )
        }else{
            this.Post.numLikes -= 1;
            this.likeColor = 'dark';
            this.postService.unlikePost(postId).subscribe(
                response => {}
            )
        }
        
    }

    viewComments(Post) {
        this.navCtrl.push(CommentPage, {'post': Post});
    }
}