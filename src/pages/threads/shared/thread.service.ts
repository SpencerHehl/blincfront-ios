import { Injectable } from '@angular/core';4
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ThreadService{
    constructor(private http: Http){}

    getLocationThreads(LocationID){
        return this.http.get('/thread/' + LocationID).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    createThread(Thread){
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('/thread/', Thread, options).map((response: Response) => {
            return response.json()
        }).catch(this.handleError);
    }

    likeThread(ThreadID){
        console.log(ThreadID);
        //submit an http post or something to an api that just does a changebyid in django to increment the like field by one
    }

    favoriteThread(ThreadID){
        console.log(ThreadID);
        //submit an http post or something to an api that just does a changebyid in django to increment the favorite
        // field by one. this will also need to add the id to the user's list of favorited threads
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}

const Threads = {
    1: [{
        Title: "General",
        Tags: ['#General', '#Permanent', '#Pinned'],
        NumPosts: 32,
        NumLikes: 17,
        NumFavorites: 2,
        isLiked: false,
        isFavorite: false
    },{
        Title: "Photos/Videos",
        Tags: ["#Permanent"],
        NumPosts: 21,
        NumLikes: 43,
        NumFavorites: 5,
        isLiked: false,
        isFavorite: false
    }],
    2: [{
        Title: "Tips/Trics",
        Tags: ['#General', '#Permanent', '#Pinned'],
        NumPosts: 32,
        NumLikes: 17,
        NumFavorites: 2,
        isLiked: false,
        isFavorite: false
    },{
        Title: "Photos/Videos",
        Tags: ["#Permanent"],
        NumPosts: 21,
        NumLikes: 43,
        NumFavorites: 5,
        isLiked: false,
        isFavorite: false
    },{
        Title: "General",
        Tags: ["#Permanent"],
        NumPosts: 21,
        NumLikes: 43,
        NumFavorites: 5,
        isLiked: false,
        isFavorite: false
    }]
}