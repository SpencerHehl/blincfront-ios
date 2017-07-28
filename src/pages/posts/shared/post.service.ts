import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PostService{
    myLocation: {
        lat: number,
        lng: number
    };
    
    constructor(private http: Http, private geolocation: Geolocation){}

    getNearbyPosts(){
        return Observable.fromPromise(this.geolocation.getCurrentPosition().then((resp) => {
            this.myLocation.lat = resp.coords.latitude;
            this.myLocation.lng = resp.coords.longitude;
            return this.http.get('http://www.blincapp.com/post/nearme?lat=' + this.myLocation.lat + '&lng=' + this.myLocation.lng).map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
        }).catch(this.handleError));
    }
    
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