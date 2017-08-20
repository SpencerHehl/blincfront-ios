import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { NotificationService } from '../../../shared/services/notifications.service';

@Component({
    templateUrl: 'list.notifications.component.html'
})
export class NotificationListPage{
    notifications: any[];

    constructor(private notificationService: NotificationService, private alertCtrl: AlertController,
         public navParams: NavParams, public navCtrl: NavController){}

    ionViewWillLoad(){
        this.notifications = this.navParams.get('notifications');
    }
}