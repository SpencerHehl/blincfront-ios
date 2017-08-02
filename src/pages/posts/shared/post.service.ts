import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PostService{
    myLocation: any;
    datePage: number;
    likesPage: number;
    
    constructor(private http: Http, private geolocation: Geolocation){
        this.datePage = 1;
        this.likesPage = 1;
    }

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
                return this.http.get('http://104.238.138.146:8080/post/nearme/date?lat=' + resp.coords.latitude + '&lng=' + resp.coords.longitude + '&page=0')
                    .map((resp) => {
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
                return this.http.get('http://104.238.138.146:8080/post/nearme/likes?lat=' + resp.coords.latitude + '&lng=' + resp.coords.longitude + '&page=0')
                    .map((resp) => {
                        return resp.json();
                    })
            })
            .catch(this.handleError);
    }

    loadDate(){
        return this.http.get('http://104.238.138.146:8080/post/nearme/date?lat=' + this.myLocation.lat + '&lng=' + this.myLocation.lng + '&page=' + this.datePage)
            .map((resp) => {
                this.datePage += 1;
                return resp.json();
            })
            .catch(this.handleError);
    }

    loadLikes(){
        return this.http.get('http://104.238.138.146:8080/post/nearme/likes?lat=' + this.myLocation.lat + '&lng=' + this.myLocation.lng + '&page=' + this.likesPage)
            .map((resp) => {
                this.likesPage += 1;
                return resp.json();
            })
            .catch(this.handleError);
    }

    updateLikes(postId, numLikes){
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        var body = {
            id: postId,
            numLikes: numLikes
        }
        return this.http.put('http://104.238.138.146:8080/post/like', body, options)
            .map((resp) => {
                return resp.json();
            })
            .catch(this.handleError);
    }

    postText(post){
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        post["location"] = this.myLocation;
        return this.http.post('http://104.238.138.146:8080/post/text/', post, options).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    postPhoto(post, image){
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        post["location"] = this.myLocation;
        post["imageData"] = image;
        return this.http.post('http://104.238.138.146:8080/post/picture/', post, options).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    private handleError(error){
        return Observable.throw(error);
    }
}