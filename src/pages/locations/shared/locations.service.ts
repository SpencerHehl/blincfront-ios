import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../../shared/services/auth.service';

declare var google;

@Injectable()
export class LocationService{
    data: any;
    myLocation: any;
    placeId: any;
    oldLocations: any;
    constructor(private http: Http, private geolocation: Geolocation, private authService: AuthService){}
    
    getMyLocations(){
        return this.http.get('http://104.238.138.146:8080/location/mylocations').map((response: Response) => {
            this.oldLocations = response.json();
            return response.json();
        }).catch(this.handleError);
    }

    getNearbyLocations(){
        return Observable.fromPromise(this.geolocation.getCurrentPosition().then((resp) => {
            this.myLocation.lat = resp.coords.latitude;
            this.myLocation.lng = resp.coords.longitude;
            return this.http.get('http://104.238.138.146:8080/location/nearme?lat=' + this.myLocation.lat + '&lng=' + this.myLocation.lng).map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
        }).catch(this.handleError));
    }

    favoriteLocation(locationsObj){
        if(!(JSON.stringify(this.oldLocations) === JSON.stringify(locationsObj))){
            let headers = new Headers({'Content-type': 'application/json'});
            let options = new RequestOptions({headers: headers});
            this.http.put('http://104.238.138.146:8080/location/favorite', locationsObj, options).subscribe();
        }
    }

    checkLocation(){

        return Observable.fromPromise(this.geolocation.getCurrentPosition())
            .map((resp) => {
                this.myLocation = {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude,
                    placeId: "",
                    name: ""
                };
                return this.myLocation
            })
            .flatMap((location) => {
                return this.reverseGeo(location)
                    .map((placeid) => {
                        return placeid;
                    });
            }).flatMap((placeid) => {
                return this.http.get('http://104.238.138.146:8080/location/resolve/' + placeid).map((response: Response) => {
                    console.log(response.json());
                    this.myLocation.name = response.json().data.name;
                    this.myLocation.placeId = placeid;
                    return response.json();
                })
            }).catch(this.handleError);
    }

    checkSearchedLocation(){
        return this.http.get('http://104.238.138.146:8080/location/resolve/' + this.placeId).map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    checkInNew(){
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('http://104.238.138.146:8080/location/checkin/new', this.myLocation, options).map((response: Response) => {
            console.log(response.json());
            return response.json();  
        }).catch(this.handleError);
    }

    checkIn(resolvedLocation){
        if(resolvedLocation.resolve == 'mongo'){
            return this.http.get('http://104.238.138.146:8080/location/checkin/' + resolvedLocation.data.placeId).map((response: Response) => {
                return response.json();
            });
        }else{
            return this.checkInNew();
        }
    }

    searchLocation(data){
        let placeService = new google.maps.places.PlacesService();
        var googleLocation = new google.maps.LatLng(this.myLocation.lat,this.myLocation.lng);
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

    private reverseGeo(myLocation){
        let geocoder = new google.maps.Geocoder;
        return Observable.create(observer => {
            geocoder.geocode({'location': {lat: myLocation.lat, lng: myLocation.lng}}, function(result, status){
                console.log(status);
                if(status == 'OK'){
                    observer.next(result[0].place_id);
                }else{
                    observer.error(status);
                }
            });

            return () => {
                console.log("complete");
            }
        })
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }

}