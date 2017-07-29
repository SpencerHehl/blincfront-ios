import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LocationService } from '../shared/locations.service';
import { ThreadListPage } from '../../threads/thread-list.component';

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage implements OnInit{
  myLocations: any;
  myLocation: any;
  resolvedLocation: any;

  constructor(public navCtrl: NavController, private locationService: LocationService, public alertCtrl: AlertController) {

  }

  ngOnInit(){
    this.locationService.getMyLocations().subscribe(
        mylocations => this.myLocations,
        err => this.failAlert(err)
    );
  }

  viewLocation(selectedLocation){
    this.navCtrl.push(ThreadListPage, {location: selectedLocation});
  }

  navigateLocation(LocationLatLon){

  }

  favoriteLocation(locationIndex, location){
    this.myLocations.favoriteLocations.push(location);
    this.myLocations.visitedLocations.splice(locationIndex);
  }

  unfavoriteLocation(locationIndex, location){
    this.myLocations.visitedLocations.push(location);
    this.myLocations.favoriteLocations.splice(locationIndex);
  }

  //still need to call a function before page navigation that saves the changes.

  checkLocation(){
      this.locationService.checkLocation().subscribe(
          response => {this.resolvedLocation},
          err => this.failAlert(err),
          () => this.confirmLocation()
      );
  }

  confirmLocation(){
    let confirm = this.alertCtrl.create({
      title: 'Confirm Location',
      message: 'Are you at ' + this.resolvedLocation.data.name + '?',
      buttons: [
        {
          text: 'Yes - Check In!',
          handler: () => {
            this.locationService.checkIn(this.resolvedLocation).subscribe(
              response => {this.myLocation},
              err => this.failAlert(err),
              () => this.navCtrl.push(ThreadListPage, {location: this.myLocation})
            );
          }
        },
        {
          text: 'Nope - not my location',
          handler: () => {
            this.searchLocation();
          }
        }
      ]
    });
    confirm.present();
  }

  searchLocation(){
    let search = this.alertCtrl.create({
      title: 'Search Location',
      message: 'Got it wrong huh? Ok so where are you really at?',
      inputs: [
        {
          name: 'Location',
          placeholder: 'Location'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Search',
          handler: data => {
            var resolvedLocation = this.locationService.searchLocation(data);
            if(resolvedLocation == "Location found"){
              this.locationService.checkSearchedLocation().subscribe(
                response => {this.locationService.checkIn(response).subscribe(
                  response => {this.resolvedLocation},
                  err => this.failAlert(err),
                  () => this.navCtrl.push(ThreadListPage, {location: this.myLocation})
                )},
                err => this.failAlert(err)
              );
            }else{
              this.failAlert(resolvedLocation);
            }
          }
        }
      ]
    });
    search.present();
  }

  failAlert(message){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
