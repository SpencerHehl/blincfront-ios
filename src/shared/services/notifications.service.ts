import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class NotificationService {
    page: number;
    myNotifications: any;

    constructor(private http: Http, private authService: AuthService){
        this.page = 0;
    }

    getNotifications(){
        let token = this.authService.authToken;
        let headers = new Headers({'Authorization': token});
        let options = new RequestOptions({headers: headers});

        return this.http.get('http://blincapp.com/notifications/', options)
            .map((resp) => {
                return resp.json();
            })
            .catch(this.handleError);
    }

    updateNotification(notificationId){
        let token = this.authService.authToken;
        let headers = new Headers({'Authorization': token});
        headers.append('Content-type', 'application/json');
        let options = new RequestOptions({headers: headers});        

        let body = {
            id: notificationId
        }

        return this.http.put('http://blincapp.com/notifications/', body, options)
            .map((resp) => {
                return resp.json();
            })
            .catch(this.handleError);
    }

    getPost(postId){
        let token = this.authService.authToken;
        let headers = new Headers({'Authorization': token});
        let options = new RequestOptions({headers: headers});

        return this.http.get('http://blincapp.com/notifications/getpost?id=' + postId, options)
            .map((resp) => {
                return resp.json();
            })
            .catch(this.handleError);
    }

    getComment(commentId){
        let token = this.authService.authToken;
        let headers = new Headers({'Authorization': token});
        let options = new RequestOptions({headers: headers});

        return this.http.get('http://blincapp.com/notifications/getcomment?id=' + commentId, options)
            .map((resp) => {
                return resp.json();
            })
            .catch(this.handleError);
    }

    getAllNotifications(){
        let token = this.authService.authToken;
        let headers = new Headers({'Authorization': token});
        let options = new RequestOptions({headers: headers});

        return this.http.get('http://blincapp.com/notifications/all?page=' + this.page, options)
            .map((resp) => {
                this.page += 1;
                return resp.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}