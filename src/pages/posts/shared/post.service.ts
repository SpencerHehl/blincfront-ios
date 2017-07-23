import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PostService{
    constructor(private http: Http){}

    getThreadPosts(ThreadID){
        return this.http.get('http://www.blincapp.com/post/' + ThreadID).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);  
    }

    createPost(Post){
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post('http://www.blincapp.com/post/', Post, options).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}