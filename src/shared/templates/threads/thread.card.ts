import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'thread-card',
    templateUrl: 'thread.card.html'
})
export class ThreadCardComponent{
    @Input() Thread: any;
    @Output() viewThisThread = new EventEmitter();
    @Output() favoriteThisThread = new EventEmitter();
    @Output() likeThisThread = new EventEmitter();
    likeColor = 'dark';
    favoriteColor = 'dark';

    constructor(){}

    ViewThread(selectedThread) {
        this.viewThisThread.emit(selectedThread);
    }

    FavoriteThread(ThreadID) {
        this.favoriteThisThread.emit(ThreadID);
        this.Thread.isFavorited = !this.Thread.isFavorited;
        if(this.Thread.isFavorited){
            this.favoriteColor = 'primary';
            this.Thread.NumFavorites += 1;
        }else{
            this.favoriteColor = 'dark';
            this.Thread.NumFavorites -= 1;
        }
    }

    LikeThread(ThreadID){
        this.likeThisThread.emit(ThreadID);
        this.Thread.isLiked = !this.Thread.isLiked;
        if(this.Thread.isLiked){
            this.likeColor = 'primary';
            this.Thread.NumLikes += 1;
        }else{
            this.likeColor = 'dark';
            this.Thread.NumLikes -= 1;
        }
    }
}