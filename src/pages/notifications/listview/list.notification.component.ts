import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { NotificationService } from '../../../shared/services/notifications.service';

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
}