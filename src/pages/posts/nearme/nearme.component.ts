import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { PostService } from '../shared/post.service';
import { PostFormModal } from '../shared/post-form.modal';

@Component({
    templateUrl: 'nearme.component.html'
})
export class NearMePage implements OnInit{
    nearbyPostsDate: any;
    nearbyPostsLikes: any;
    postFilter: string;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, 
        private postService: PostService, public navParams: NavParams, 
        public alertCtrl: AlertController, private camera: Camera){
        this.postFilter = 'date';
    }

    ngOnInit(){
        this.postService.getNearbyPostsDate().subscribe(
            response => {
                this.nearbyPostsDate = response;
            },
            err => this.failAlert(err)
        );
    }

    postText(){
        let textModal = this.modalCtrl.create(PostFormModal);
        textModal.present();
    }

    postPhoto(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            this.failAlert(err);
        });
    }

    loadMore(){
        if(this.postFilter == 'date'){
            this.postService.loadDate().subscribe(
                response => {
                    this.nearbyPostsDate.push(response);
                },
                err => this.failAlert(err)
            )
        }else{
            this.postService.loadLikes().subscribe(
                response => {
                    this.nearbyPostsLikes.push(response);
                },
                err => this.failAlert(err)
            )
        }
    }

    onFilterChange(){
        console.log("here");
        if((!this.nearbyPostsLikes) && this.postFilter == 'like'){
            this.postService.getNearbyPostsLikes().subscribe(
                response => {
                    this.nearbyPostsLikes = response;
                },
                err => this.failAlert(err)
            )
        }
    }

    reloadPosts(refresher){
        if(this.postFilter == 'date'){
            this.postService.getNearbyPostsDate().subscribe(
                response => {
                    this.nearbyPostsDate = response;
                    refresher.complete();
                },
                err => this.failAlert(err)
            )
        }else{
            this.postService.getNearbyPostsLikes().subscribe(
                response => {
                    this.nearbyPostsLikes = response;
                    refresher.complete();
                },
                err => this.failAlert(err)
            )
        }
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