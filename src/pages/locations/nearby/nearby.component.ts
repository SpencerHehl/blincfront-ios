import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocationService } from '../shared/locations.service';
import { ThreadListPage } from '../../threads/thread-list.component';

@Component({
    templateUrl: "nearby.component.html"
})
export class NearbyPage implements OnInit{
    nearbyLocations: any[];
    myLocation: any;
    constructor(private locationService: LocationService, public navCtrl: NavController){}

    ngOnInit() {
        this.locationService.getNearbyLocations().subscribe(
            locations => this.nearbyLocations,
            err => alert(err)
        );
    }

    viewLocation(selectedLocation){
        this.navCtrl.push(ThreadListPage, {location: selectedLocation});
    }

    navigateLocation(LocationLatLon){

    }

    checkIn(){
        this.locationService.checkIn().subscribe(
          locationId => {this.myLocation},
          err => alert(err),
          () => this.navCtrl.push(ThreadListPage, {location: this.myLocation})
        );
    }
}