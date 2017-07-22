import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '@ionic/cloud-angular';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
    currentUser: any;

    constructor(public user: User, private http: Http){}

    login(user){
        this.currentUser = user;
        this.currentUser.ionic_id = this.user.id;
    }

    newUser(user){
        this.login(user);
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('/user/newuser', this.currentUser, options).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    isAuthenticated(){
        return !!this.currentUser;
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}