import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PostService } from '../../../pages/posts/shared/post.service';

@Component({
    selector: 'post-card',
    templateUrl: 'post.card.html'
})
export class PostCardComponent {
    @Input() Post: any;
    @Output() viewThisPost = new EventEmitter();

    constructor(private postService: PostService){}

    LikePost(PostID) {
        this.Post.likedByUser = !this.Post.likedByUser;
        if(this.Post.likedByUser){
            this.Post.numLikes += 1;
        }else{
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