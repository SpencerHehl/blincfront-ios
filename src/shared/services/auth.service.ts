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
        this.currentUser = this.user.id;
    }

    newUser(passedUser){
        let newUser = passedUser;
        newUser.ionic_id = this.user.id;
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('http://www.blincapp.com/user/newuser', this.newUser, options).map((response: Response) => {
            this.currentUser = response.json();
            return "Completed";
        }).catch(this.handleError);
    }

    isAuthenticated(){
        return !!this.currentUser;
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}