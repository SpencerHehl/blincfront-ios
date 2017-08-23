import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { PostService } from '../../../shared/services/post.service';
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
    Post: any;

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
                    var marker = new google.maps.Marker({
                        position: postLocation,
                        map: this.map,
                        post: post
                    })
                    var contentString = '<ion-card [hidden]="Post.isFlagged">' +
                    '<ion-item>' + 
                      '<ion-avatar item-start>' + 
                        '<img [src]="Post.poster?.profilePicture" (click)="viewProfile()">' + 
                      '</ion-avatar>' + 
                      '<h2 (click)="viewProfile()" style="font-weight:bold">{{Post.poster?.fullName}}</h2>' + 
                      '<ion-note>' + 
                          '{{Post.createdDate | dateAge}}' + 
                      '</ion-note>' + 
                      '<ion-buttons item-end>' + 
                          '<button ion-button (click)="viewMore()" clear><ion-icon name="more"></ion-icon></button>' + 
                      '</ion-buttons>' + 
                    '</ion-item>'
                    '<ion-card-content style="margin-top:1%">' + 
                      '<h2 style="font-weight:bold">{{Post.content?.title}} <ion-icon *ngIf="Post.content?.location" name="at" color="primary"></ion-icon> {{Post.content?.location}}</h2>'        
                      '<img *ngIf="Post.content.contentType == \'photo\'" [src]="Post?.content.img">' + 
                      '<p>{{Post.content.body}}</p>' + 
                    '</ion-card-content>' + 
                    '<ion-row>' + 
                      '<ion-col>' + 
                        '<button ion-button icon-lef clear small (click)="likePost(Post._id)" [color]="likeColor">' + 
                          '<ion-icon name="thumbs-up"></ion-icon>"' +
                         '<div>{{Post.numLikes}} Likes</div>"' + 
                        '</button>' + 
                      '</ion-col>' + 
                      '<ion-col>' +
                        '<button ion-button icon-left clear small (click)="viewComments(Post)" color="dark">' +
                          '<ion-icon name="text"></ion-icon>' +
                          '<div>{{Post.numComments}} Comments</div>' +
                        '</button>' +
                      '</ion-col>' +
                    '</ion-row>' +
                  '</ion-card>';
                    var infoWindow = new google.maps.InfoWindow({
                        content: contentString
                    })
                    var self = this;
                    marker.addListener('click', function(){
                        self.Post = marker.post;
                        infoWindow.open(self.map, marker);
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