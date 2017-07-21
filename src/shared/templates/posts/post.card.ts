import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'post-card',
    templateUrl: 'post.card.html'
})
export class PostCardComponent {
    @Input() Post: any;
    @Output() viewThisPost = new EventEmitter();
    @Output() likeThisPost = new EventEmitter();
    likeColor = 'dark';

    constructor(){}

    LikePost(PostID) {
        this.likeThisPost.emit(PostID);
        this.Post.isLiked = !this.Post.isLiked;
        if(this.Post.isLiked){
            this.likeColor = 'primary';
            this.Post.NumLikes += 1;
        }else{
            this.likeColor = 'dark';
            this.Post.NumLikes -= 1;
        }
    }

    ViewComments(Post) {
        this.viewThisPost.emit(Post)
    }
}