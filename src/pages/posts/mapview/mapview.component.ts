import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { PostService } from '../shared/post.service';
import { ListViewPage } from '../listview/listview.component';

declare var google: any;

@Component({
    templateUrl: 'mapview.component.html',
    styles: [`
        #map {
            height: 100%
        }
    `]
})
export class MapViewPage{
    myLocation: any;
    markers: any;
    map: any;

    constructor(public navCtrl: NavController, private navParams: NavParams,
        public alertCtrl: AlertController, private postService: PostService){}

    ionViewWillLoad(){
        this.postService.getMyLocation().subscribe(
            resp => {
                this.myLocation = resp;
                this.initMap();
            },
            err => this.failAlert(err)
        );
    }

    

    initMap(){
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: this.myLocation,
          disableDefaultUI: true
        });
        this.updateMarkers(15, this.myLocation);
        var self = this;
        this.map.addListener('bounds_changed', function(){
            var newZoom = self.map.getZoom();
            var newCenter = self.map.getCenter();
            var centerLatLng = {'lat': newCenter.lat(), 'lng': newCenter.lng()};
            self.updateMarkers(newZoom, centerLatLng);
        }, {passive: true});
    }

    updateMarkers(zoom, location){
        var distance = this.calcDistance(location.lat, zoom);
        this.postService.getMapMarkers(distance, location).subscribe(
            resp => {
                this.markers = resp.map((post) => {
                    var postLocation = {
                        lat: post.geolocation[1],
                        lng: post.geolocation[0]
                    }
                    return new google.maps.Marker({
                        position: postLocation,
                        map: this.map,
                    })
                })
            },
            err => this.failAlert(err)
        )
    }

    viewPosts(){
        var currZoom = this.map.getZoom();
        var mapCenter = this.map.getCenter();
        var currCenter = {lat: mapCenter.lat(), lng: mapCenter.lng()};
        var distance = this.calcDistance(currCenter.lat, currZoom);
        this.navCtrl.push(ListViewPage, {'distance': distance, 'center': currCenter});
    }

    calcDistance(lat, zoom){
        var metersPerPixel = Math.cos(lat * Math.PI/180) * 2 * Math.PI * 6378137 / (256 * Math.pow(2, zoom));
        var distance = metersPerPixel * this.map.getDiv().offsetHeight;
        return distance;
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