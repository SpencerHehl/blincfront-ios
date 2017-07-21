import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { PostService } from '../shared/post.service';
import { PostFormModal } from '../post-form.modal';

@Component({
    templateUrl: 'post-list.component.html'
})
export class PostListPage implements OnInit{
    ThreadPosts: any[];
    CurrentThread: any;
    postMode: string;

    constructor(public navCtrl: NavController, private postService: PostService, public navParams: NavParams, public modalCtrl: ModalController){}

    ngOnInit(){
        this.CurrentThread = this.navParams.get('thread');
        this.postMode = this.navParams.get('mode');
        this.postService.getThreadPosts(this.CurrentThread._id).subscribe(
            posts => this.ThreadPosts   
        );
    }

    postComment(ThreadID){
        let commentModal = this.modalCtrl.create(PostFormModal, {threadID: this.CurrentThread.ID});
        commentModal.present();
    }

    postMedia(ThreadID){

    }

    likePost(PostID){

    }

    favoritePost(PostID){

    }

    viewPost(PostID){

    }
}