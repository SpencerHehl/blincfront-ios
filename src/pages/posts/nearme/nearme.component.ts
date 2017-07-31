import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { PostService } from '../shared/post.service';
import { PostFormModal } from '../shared/post-form.modal'

@Component({
    templateUrl: 'nearme.component.html'
})
export class NearMePage implements OnInit{
    nearbyPostsDate: any;
    nearbyPostsLikes: any;
    postFilter: string;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, private postService: PostService, public navParams: NavParams, public alertCtrl: AlertController){
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

    postMedia(){

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