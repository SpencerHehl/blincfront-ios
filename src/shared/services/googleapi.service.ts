import { Injectable } from '@angular/core';

declare var gapi;

@Injectable()
export class googleApi{
    initializeApi(){
        gapi.load('client', function(){
            gapi.client.init({
                'apiKey': 'AIzaSyBMqQ2Hxp3CVqJ3pDg4uiDRP096qDANeaQ',
                
            })
        })
    }
}