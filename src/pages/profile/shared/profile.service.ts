import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class ProfileService{
    page: number;

    constructor(private http:Http, private authService: AuthService){
        this.page = 0;
    }

    getMyPosts(){
        let token = this.authService.authToken;
        console.log(token);
        let headers = new Headers({'Authorization': token});
        let options = new RequestOptions({headers: headers});
        return this.http.get('http://104.238.138.146:8081/post/myposts?page=' + this.page, options)
            .map((resp) => {
                this.page += 1;
                return resp.json();
            })
            .catch(this.handleError);
    }

    private handleError(error){
        return Observable.throw(error);
    }
}