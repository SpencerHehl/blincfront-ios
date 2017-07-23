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
            this.locationService.searchLocation(data).subscribe(
              response => {
                if(response == '' || response == null){
                  this.failAlert("No results found.");
                }else{
                  this.myLocation = response;
                }
              },
              err => this.failAlert(err),
              () => this.navCtrl.push(ThreadListPage, {location: this.myLocation})
            );
          }
        },
        {
          text: 'Search',
          handler: data => {

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
