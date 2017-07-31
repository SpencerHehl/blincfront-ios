import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PostService{
    myLocation: any;
    
    constructor(private http: Http, private geolocation: Geolocation){}

    getNearbyPostsDate(){
        return Observable.fromPromise(this.geolocation.getCurrentPosition())
            .map((resp) => {
                this.myLocation = {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude
                }
                return resp;
            })
            .flatMap((resp) => {
                return this.http.get('http://104.238.138.146:8080/post/nearme/date?lat=' + resp.coords.latitude + '&lng=' + resp.coords.longitude)
                    .map((resp) => {
                        console.log(resp);
                        return resp.json();
                    })
            })
            .catch(this.handleError);
    }

    getNearbyPostsLikes(){
        return Observable.fromPromise(this.geolocation.getCurrentPosition())
            .map((resp) => {
                this.myLocation = {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude
                }
                return resp;
            })
            .flatMap((resp) => {
                return this.http.get('http://104.238.138.146:8080/post/nearme/likes?lat=' + resp.coords.latitude + '&lng=' + resp.coords.longitude)
                    .map((resp) => {
                        console.log(resp);
                        return resp.json();
                    })
            })
            .catch(this.handleError);
    }

    postText(Post){
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        Post["location"] = this.myLocation;
        console.log(Post);
        return this.http.post('http://104.238.138.146:8080/post/text/', Post, options).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    private handleError(error){
        return Observable.throw(error);
    }
}