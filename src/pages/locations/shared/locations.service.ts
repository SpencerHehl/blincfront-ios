import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../../shared/services/auth.service';

declare var google;

@Injectable()
export class LocationService{
    data: any;
    mylocation: {
        lat: number,
        lng: number,
        place_id: string
    };
    constructor(private http: Http, private geolocation: Geolocation, private authService: AuthService){}
    
    getMyLocations(){
        return this.http.get('http://www.blincapp.com/location/mylocations').map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    getNearbyLocations(){
        return Observable.fromPromise(this.geolocation.getCurrentPosition().then((resp) => {
            this.mylocation.lat = resp.coords.latitude;
            this.mylocation.lng = resp.coords.longitude;
            return this.http.get('http://www.blincapp.com/location/nearme?lat=' + this.mylocation.lat + '&lng=' + this.mylocation.lng).map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
        }).catch(this.handleError));
    }

    favoriteLocation(selectedLocation){
        console.log(selectedLocation);
    }

    checkLocation(){
        return Observable.fromPromise(this.geolocation.getCurrentPosition().then((resp) =>{
            this.mylocation.lat = resp.coords.latitude;
            this.mylocation.lng = resp.coords.longitude;
            let geocoder = new google.maps.Geocoder;

            return geocoder.geocode({location: this.mylocation, function(results, status){
                    if(status == 'OK') {
                        if(results[1]){
                            this.mylocation.place_id = results[1].place_id;
                            return this.http.get('http://www.blincapp.com/location/resolve/' + this.mylocation.place_id).map((response: Response) => {
                                return response.json();
                            }).catch(this.handleError);
                        }
                    }
                }
            });
        }).catch(this.handleError));
    }

    checkSearchedLocation(){
        return this.http.get('http://www.blincapp.com/location/resolve/' + this.mylocation.place_id).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    checkInNew(){
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('http://www.blincapp.com/location/checkin/new', this.mylocation, options).map((response: Response) => {
            return response.json();  
        }).catch(this.handleError);
    }

    checkIn(resolvedLocation){
        if(resolvedLocation.resolve == 'mongo'){
            return this.http.get('http://www.blincapp.com/location/checkin/' + resolvedLocation.data.placeId).map((response: Response) => {
                return response.json();
            });
        }else{
            return this.checkInNew();
        }
    }

    searchLocation(data){
        let placeService = new google.maps.places.PlacesService();
        var googleLocation = new google.maps.LatLng(this.mylocation.lat,this.mylocation.lng);
        var request = {
            query: data,
            radius: '20',
            location: googleLocation
        };
        return placeService.textSearch(request, function(results, status){
            if(status == google.maps.places.PlacesServiceStatus.OK){
                if(results.length >= 1){
                    this.mylocation.place_id = results[0].place_id;
                    return "Location found";
                }else{
                    return "Location not found";
                }
            }
        })
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }

}