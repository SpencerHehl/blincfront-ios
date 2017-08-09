import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class CommentService{
    constructor(private http: Http, private authService: AuthService){}

    getComments(postId){
        let token = this.authService.authToken;
        let headers = new Headers({'Authorization': token});
        let options = new RequestOptions({headers: headers});
        return this.http.get('http://104.238.138.146:8081/comment/' + postId, options)
            .map((resp) => {
                return resp.json()
            })
            .catch(this.handleError);
    }

    postPictureComment(formValues, imgData){
        let headers = new Headers({'Content-type': 'application/json'});
        let token = this.authService.authToken;
        headers.append('Authorization', token);
        let options = new RequestOptions({headers: headers});
        formValues["imageData"] = imgData;
        return this.http.post('http://104.238.138.146:8081/comment/picture/', formValues, options).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    postTextComment(formValues){
        let headers = new Headers({'Content-type': 'application/json'});
        let token = this.authService.authToken;
        headers.append('Authorization', token);
        let options = new RequestOptions({headers: headers});
        return this.http.post('http://104.238.138.146:8081/comment/text/', formValues, options).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    likeComment(commentId){
        let headers = new Headers({'Content-type': 'application/json'});
        let token = this.authService.authToken;
        headers.append('Authorization', token);
        let options = new RequestOptions({headers: headers});
        let body = {
            id: commentId
        }
        return this.http.put('http://104.238.138.146:8081/comment/like', body, options)
            .map((resp) => {
                return resp.json();
            })
            .catch(this.handleError);
    }

    unlikeComment(commentId){
        let headers = new Headers({'Content-type': 'application/json'});
        let token = this.authService.authToken;
        headers.append('Authorization', token);
        let options = new RequestOptions({headers: headers});
        let body = {
            id: commentId
        }
        return this.http.put('http://104.238.138.146:8081/comment/unlike', body, options)
            .map((resp) => {
                return resp.json();
            })
            .catch(this.handleError);
    }

    private handleError(error){
        return Observable.throw(error);
    }
}