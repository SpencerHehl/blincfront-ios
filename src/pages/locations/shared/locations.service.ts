import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';

declare var google;

@Injectable()
export class LocationService{
    data: any;
    mylocation: {
        lat: number,
        lng: number,
        place_id: string
    };
    constructor(private http: Http, private geolocation: Geolocation){}
    
    getMyLocations(){
        return this.http.get('/mylocations').map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    getNearbyLocations(){
        return Observable.fromPromise(this.geolocation.getCurrentPosition().then((resp) => {
            this.mylocation.lat = resp.coords.latitude;
            this.mylocation.lng = resp.coords.longitude;
            return this.http.get('/nearme?lat=' + this.mylocation.lat + '&lng=' + this.mylocation.lng).map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
        }).catch((error) => {
            console.log(error);  
        }));
    }

    favoriteLocation(selectedLocation){
        console.log(selectedLocation);
    }

    checkIn(){
        return Observable.fromPromise(this.geolocation.getCurrentPosition().then((resp) =>{
            this.mylocation.lat = resp.coords.latitude;
            this.mylocation.lng = resp.coords.longitude;
            let geocoder = new google.maps.Geocoder;

            return geocoder.geocode({location: this.mylocation, function(results, status){
                    if(status == 'OK') {
                        if(results[1]){
                            this.mylocation.place_id = results[1].place_id;
                            return this.http.get('/checkin/' + this.mylocation.place_id).map((response: Response) => {
                                if(response.json() == ''){
                                    return this.checkInNew()
                                }else{
                                    return response.json();
                                }
                            }).catch(this.handleError);
                        }
                    }
                }
            });
        }).catch((error) => {
            console.log(error);
        }));
    }

    checkInNew(){
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('/checkin/new', this.mylocation, options).map((response: Response) => {
            return response.json();  
        }).catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}