import { Injectable } from '@angular/core'

@Injectable()
export class AuthService {
    currentUser: any;
    facebookLogin(){
        this.currentUser = {
            firstName: "Spencer",
            lastName: "Hehl"
        }
    }

    googleLogin(){
        this.currentUser = {
            firstName: "Spencer",
            lastName: "Hehl"
        }
    }

    isAuthenticated(){
        return !!this.currentUser;
    }
}