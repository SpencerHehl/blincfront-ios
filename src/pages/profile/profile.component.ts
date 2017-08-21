import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AuthService } from '../../shared/services/auth.service';
import { ProfileService } from './shared/profile.service';
import { PostService } from '../../shared/services/post.service';
import { NotificationService } from '../../shared/services/notifications.service';
import { PostFormModal } from '../../shared/modals/post-form.modal';
import { FollowListPage } from './followlist/followlist.component';
import { NotificationListPage } from '../notifications/listview/list.notification.component';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfilePage {
  user: any;
  followColor: string;
  followText: string;
  isActiveUser: boolean;
  notifications: any[];

  constructor(public navCtrl: NavController, private authService: AuthService,
    private profileService: ProfileService, public alertCtrl: AlertController,
    private postService: PostService, public modalCtrl: ModalController,
    private camera: Camera, private navParams: NavParams,
    private notifcationService: NotificationService) {}

    ionViewWillLoad(){
        var passedUser = this.navParams.get('user');
        if(!passedUser){
            passedUser = this.authService.mongoUser;
        }
        this.profileService.getProfile(passedUser._id).subscribe(
            response => {
                console.log(response);
                this.user = response;
                if(this.user.followed){
                    this.followColor = 'primary';
                    this.followText = "Followed";
                }else{
                    this.followColor = 'dark';
                    this.followText = "Unfollowed";
                }
                if(this.user._id == this.authService.mongoUser._id){
                    this.isActiveUser = true;
                }else{
                    this.isActiveUser = false;
                }
            },
            err => this.failAlert(err)
        )
    }

    ionViewDidEnter(){
        this.notifcationService.getUnreadNotifications().subscribe(
            response => {
                this.notifications = response;
            },
            err => this.failAlert(err)
        )
    }

    loadMore(){
        this.profileService.getProfilePosts(this.user._id).subscribe(
            response => {
                if(response.length > 0){
                    this.user.myPosts.push(response);
                }
            },
            err => this.failAlert(err)
        )
    }

    postText(){
        let postModal = this.modalCtrl.create(PostFormModal, {postType: 'text'});
        postModal.present();
        postModal.onDidDismiss(response => {
            if(response){
                this.user.myPosts.unshift(response);                
            }
        });
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
            postModal.onDidDismiss(response => {
                if(response){
                    this.user.myPosts.unshift(response);
                }
            });
        }, (err) => {
            this.failAlert(err);
        });
    }

    followUser(){
        this.user.followed = !this.user.followed;
        if(this.user.followed){
            this.followColor = 'primary';
            this.followText = "Followed";
            this.profileService.follow(this.user._id).subscribe(
                response => {},
                err => this.failAlert(err)
            )
        }else{
            this.followColor = 'dark';
            this.followText = "Unfollowed";
            this.profileService.unfollow(this.user._id).subscribe(
                response => {},
                err => this.failAlert(err)
            )
        }
    }

    viewFollowerList(){
        if(this.isActiveUser){
            this.navCtrl.push(FollowListPage, {followList: this.user.followedBy, listType: 'Followers'});
        }
    }

    viewFollowingList(){
        if(this.isActiveUser){
            this.navCtrl.push(FollowListPage, {followList: this.user.followList, listType: 'Following'});
        }
    }

    reportPost(post, index){
        this.user.myPosts.splice(index, 1);
        this.postService.reportPost(post).subscribe(
            resp => {},
            err => this.failAlert(err)
        )
    }

    deletePost(post, index){
        this.user.myPosts.splice(index, 1);
        this.postService.deletePost(post).subscribe(
            resp => {
                console.log(resp);
            },
            err => this.failAlert(err)
        )
    }

    viewNotifications(){
        this.navCtrl.push(NotificationListPage);
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
