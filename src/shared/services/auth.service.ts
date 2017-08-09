import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GoogleAuth, FacebookAuth, User } from '@ionic/cloud-angular';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
    authMethod: string;
    currentUser: any;
    authToken: any;

    constructor(public user: User, private http: Http,
        private facebookAuth: FacebookAuth, private googleAuth: GoogleAuth){}

    newUser(passedUser){
        let newUser = passedUser;
        newUser.ionic_id = this.user.id;
        let headers = new Headers({'Content-type': 'application/json'});
        headers.append('Authorization', this.authToken);
        let options = new RequestOptions({headers: headers});
        return this.http.post('http://104.238.138.146:8081/user/newuser', newUser, options).map((response: Response) => {
            return JSON.stringify(response.json());
        }).catch(this.handleError);
    }

    login(){
        let ionicId;
        if(this.authMethod == 'facebook'){
            this.authToken = this.facebookAuth.getToken();
            ionicId = this.user.id;
        }else{
            this.authToken = this.googleAuth.getToken();
            ionicId = this.user.id;
        }
        let body = {
            ionicId: ionicId
        };
        let headers = new Headers({'Content-type': 'application/json'});
        headers.append('Authorization', this.authToken);
        let options = new RequestOptions({headers: headers});
        console.log(options);
        console.log(body);
        return this.http.post('http://104.238.138.146:8081/user/login', body, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            })
            .catch(this.handleError);
    }

    logout(){
        let body = {};
        let token;
        if(this.authMethod == 'facebook'){
            token = this.facebookAuth.getToken();
        }else{
            token = this.googleAuth.getToken();
        }
        let headers = new Headers({'Content-type': 'application/json'});
        headers.append('Authorization', token);
        let options = new RequestOptions({headers: headers});
        return this.http.post('http://104.238.138.146:8081/user/logout', body, options)
        .map((response) =>{
            return response.json();
        })
        .catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}