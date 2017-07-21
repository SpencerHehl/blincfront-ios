import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { PostService } from './shared/post.service';

@Component({
    templateUrl: 'post-form.modal.html'
})
export class PostFormModal {
    constructor(private postService: PostService, private navParams: NavParams, private viewCtrl: ViewController){}

    postComment(formValues){
        formValues.ThreadID = this.navParams.get("threadID");
        //this.postService.createComment(formValues);
        this.viewCtrl.dismiss();
    }

    cancel(){
        this.viewCtrl.dismiss();
    }
}