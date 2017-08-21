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
        this.notificationService.getAllNotifications().subscribe(
            response => {
                this.notifications = response;
            }
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
}