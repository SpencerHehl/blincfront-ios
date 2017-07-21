import { Component, Input } from '@angular/core';

@Component({
    templateUrl: 'post.component.html'
})

export class PostPage {
    @Input() Post: any;
    constructor(){}
}