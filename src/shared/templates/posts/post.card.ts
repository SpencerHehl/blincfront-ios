import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PostService } from '../../../pages/posts/shared/post.service';

@Component({
    selector: 'post-card',
    templateUrl: 'post.card.html'
})
export class PostCardComponent {
    @Input() Post: any;
    @Output() viewThisPost = new EventEmitter();
    likeColor: string;

    constructor(private postService: PostService){}

    ngOnInit(){
        if(this.Post.likedByUser){
            this.likeColor = 'primary';
        }else{
            this.likeColor = 'dark';
        }
    }

    LikePost(PostID) {
        this.Post.likedByUser = !this.Post.likedByUser;
        if(this.Post.likedByUser){
            this.Post.numLikes += 1;
            this.likeColor = 'primary';
            this.postService.likePost(PostID).subscribe(
                response => {}
            )
        }else{
            this.Post.numLikes -= 1;
            this.likeColor = 'dark';
            this.postService.unlikePost(PostID).subscribe(
                response => {}
            )
        }
        
    }

    ViewComments(Post) {
        this.viewThisPost.emit(Post)
    }
}