import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CommentService } from '../../../pages/comments/shared/comment.service';

@Component({
    selector: 'comment-card',
    templateUrl: 'comment.card.html'
})
export class CommentCardComponent{
    @Input() Comment: any;
    likeColor: string;

    constructor(private commentService: CommentService){}

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
}
