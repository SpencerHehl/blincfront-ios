import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AuthService } from '../../../shared/services/auth.service';
import { ProfileService } from '../shared/profile.service';
import { PostService } from '../../posts/shared/post.service';
import { PostFormModal } from '../../posts/shared/post-form.modal';

@Component({
  templateUrl: 'myfeed.component.html'
})
export class MyFeedPage {
  myPosts: any;

  constructor(public navCtrl: NavController, private authService: AuthService,
    private profService: ProfileService, public alertCtrl: AlertController,
    private postService: PostService, public modalCtrl: ModalController,
    private camera: Camera) {}

    ionViewWillLoad(){
        this.profService.getMyPosts().subscribe(
            response => {
                if(response.length > 0){
                    this.myPosts = response;
                }
            },
            err => this.failAlert(err)
        )
    }

    loadMore(){
        this.profService.getMyPosts().subscribe(
            response => {
                if(response.length > 0){
                    this.myPosts.push(response);
                }
            },
            err => this.failAlert(err)
        )
    }

    postText(){
        let postModal = this.modalCtrl.create(PostFormModal, {postType: 'text'});
        postModal.present();
    }

    postPhoto(){
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            let postModal = this.modalCtrl.create(PostFormModal, {postType: 'photo', image: base64Image});
            postModal.present();
        }, (err) => {
            this.failAlert(err);
        });
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
