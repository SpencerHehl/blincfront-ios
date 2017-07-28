import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'location-card',
    templateUrl: 'location.card.html',
    styles: [`
        .favoriteIcon {font-size: 90px;}
    `]
})
export class LocationCardComponent {
    @Input() Location: any;
    @Input() isFavorite: boolean;
    @Output() viewThisLocation = new EventEmitter();
    @Output() navigateThisLocation = new EventEmitter();
    @Output() favoriteThisLocation = new EventEmitter();
    constructor(){}

    viewLocation(selectedLocation){
        this.viewThisLocation.emit(selectedLocation);
    }

    navigateLocation(locationLatLon){
        this.navigateThisLocation.emit(locationLatLon);
    }

    favoriteLocation(selectedLocation){
        this.favoriteThisLocation.emit(selectedLocation);
    }
}