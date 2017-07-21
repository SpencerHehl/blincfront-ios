import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { ThreadService } from './shared/thread.service';

@Component({
    templateUrl: 'thread-form.modal.html'
})
export class ThreadFormModal {
    constructor(private threadService: ThreadService, private navParams: NavParams, public viewCtrl: ViewController){}

    createThread(formValues){
        formValues.locationID = this.navParams.get("locationID");
        this.threadService.createThread(formValues);
        this.viewCtrl.dismiss();
    }

    cancel(){
        this.viewCtrl.dismiss();
    }
}