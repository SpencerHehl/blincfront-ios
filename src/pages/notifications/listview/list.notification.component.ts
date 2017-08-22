import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { NotificationService } from '../../../shared/services/notifications.service';
import { NotificationPage } from '../notification/notification.component';
import { ProfilePage } from '../../profile/profile.component';

@Component({
    templateUrl: 'list.notification.component.html'
})
export class NotificationListPage{
    notifications: any[];

    constructor(private notificationService: NotificationService, private alertCtrl: AlertController,
         public navParams: NavParams, public navCtrl: NavController){}

    ionViewWillLoad(){
        this.notificationService.getNotifications().subscribe(
            response => {
                console.log(response);
                this.notifications = response;
            },
            err => this.failAlert(err)
        )
    }
    viewProfile(notification){
        this.navCtrl.push(ProfilePage, { followUser: notification.sourceUser._id });
        this.notificationService.updateNotification(notification._id).subscribe();
    }

    viewItem(notification){
        if(notification.commentId){
            this.navCtrl.push(NotificationPage, { type: 'comment', commentId: notification.commentId });
            this.notificationService.updateNotification(notification._id).subscribe();
        }else if(notification.postId){
            this.navCtrl.push(NotificationPage, { type: 'post', postId: notification.postId });
            this.notificationService.updateNotification(notification._id).subscribe();
        }else{
            this.navCtrl.push(ProfilePage, { followUser: notification.sourceUser._id });
            this.notificationService.updateNotification(notification._id).subscribe();
        }
    }

    loadMore(){
        this.notificationService.getMoreNotifications().subscribe(
            response => {
                if(response.length > 0){
                    this.notifications.push(response);
                }
            },
            err => this.failAlert(err)
        )
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