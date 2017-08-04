import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NearMePage } from '../pages/posts/nearme/nearme.component';
import { PostFormModal } from '../pages/posts/shared/post-form.modal';
import { LoginPage } from '../pages/login/login.component';

import { PostCardComponent } from '../shared/templates/posts/post.card'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';

import { PostService } from '../pages/posts/shared/post.service';
import { AuthService } from '../shared/services/auth.service';
import { DateAgePipe } from '../shared/pipes/date.pipe';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '95855829'
  },
  'auth': {
    'google': {
      'webClientId': '819051050180-tjmq0ap9h09r4b594s54f2hicnsjgqlc.apps.googleusercontent.com',
      'scope': []
    },
    'facebook': {
      'scope': []
    }
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    NearMePage,
    PostCardComponent,
    PostFormModal,
    LoginPage,
    DateAgePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    NearMePage,
    PostFormModal,
    LoginPage
  ],
  providers: [
    PostService,
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    AuthService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
