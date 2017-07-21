import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ThreadService } from './shared/thread.service';
import { LocationService } from '../locations/shared/locations.service';
import { PostListPage } from '../posts/post-list/post-list.component';
import { ThreadFormModal } from './thread-form.modal';

@Component({
    templateUrl: 'thread-list.component.html'
})

export class ThreadListPage implements OnInit{
    LocThreads: any[];
    CurrentLocation: any;
    threadMode: string;

    constructor(public navCtrl: NavController, private threadService: ThreadService, private navParams: NavParams, private locationService: LocationService, public modalCtrl: ModalController){}

    ngOnInit(){
        this.CurrentLocation = this.navParams.get('location');
        this.threadService.getLocationThreads(this.CurrentLocation._id).subscribe(
            threads => this.LocThreads
        );
    }

    viewThread(selectedThread){
        this.navCtrl.push(PostListPage, {thread: selectedThread, mode: this.threadMode});
    }

    likeThread(ThreadID){
        this.threadService.likeThread(ThreadID);
    }

    favoriteThread(ThreadID){
        this.threadService.favoriteThread(ThreadID);
    }

    createThread(){
        let threadModal = this.modalCtrl.create(ThreadFormModal, {locationID: this.CurrentLocation._id});
        threadModal.present();
    }
}