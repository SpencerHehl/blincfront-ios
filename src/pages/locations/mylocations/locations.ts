import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocationService } from '../shared/locations.service';
import { ThreadListPage } from '../../threads/thread-list.component';

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage implements OnInit{
  MyLocations: any[];
  myLocation: any;

  constructor(public navCtrl: NavController, private locationService: LocationService) {

  }

  ngOnInit(){
    this.locationService.getMyLocations().subscribe(
        mylocations => this.MyLocations
    );
  }

  viewLocation(selectedLocation){
    this.navCtrl.push(ThreadListPage, {location: selectedLocation, mode: "readOnly"});
  }

  navigateLocation(LocationLatLon){

  }

  checkIn(){
      this.locationService.checkIn().subscribe(
          locationId => {this.myLocation},
          () => this.navCtrl.push(ThreadListPage, {location: this.myLocation, mode: "full"})
      );
  }
}
