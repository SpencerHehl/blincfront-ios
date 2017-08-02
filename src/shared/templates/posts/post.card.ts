import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PostService } from '../../../pages/posts/shared/post.service';

@Component({
    selector: 'post-card',
    templateUrl: 'post.card.html'
})
export class PostCardComponent {
    @Input() Post: any;
    @Output() viewThisPost = new EventEmitter();
    likeColor = 'dark';

    constructor(private postService: PostService){}

    LikePost(PostID) {
        this.Post.isLiked = !this.Post.isLiked;
        if(this.Post.isLiked){
            this.likeColor = 'primary';
            this.Post.numLikes += 1;
        }else{
            this.likeColor = 'dark';
            this.Post.numLikes -= 1;
        }
        this.postService.updateLikes(PostID, this.Post.numLikes).subscribe(
            response => {}
        )
    }

    ViewComments(Post) {
        this.viewThisPost.emit(Post)
    }
}