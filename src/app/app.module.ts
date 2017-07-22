import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { LocationsPage } from '../pages/locations/mylocations/locations';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NearbyPage} from '../pages/locations/nearby/nearby.component';
import { ThreadListPage } from '../pages/threads/thread-list.component';
import { PostListPage } from '../pages/posts/post-list/post-list.component';
import { ThreadFormModal } from '../pages/threads/thread-form.modal';
import { PostFormModal } from '../pages/posts/post-form.modal';
import { LoginModal } from '../shared/modals/login.modal';

import { LocationCardComponent } from '../shared/templates/locations/location.card';
import { ThreadCardComponent } from '../shared/templates/threads/thread.card';
import { PostCardComponent } from '../shared/templates/posts/post.card'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';

import { LocationService } from '../pages/locations/shared/locations.service';
import { ThreadService } from '../pages/threads/shared/thread.service';
import { PostService } from '../pages/posts/shared/post.service';
import { AuthService } from '../shared/services/auth.service';

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
    LocationsPage,
    HomePage,
    TabsPage,
    NearbyPage,
    ThreadListPage,
    PostListPage,
    LocationCardComponent,
    ThreadCardComponent,
    PostCardComponent,
    ThreadFormModal,
    PostFormModal,
    LoginModal
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
    LocationsPage,
    HomePage,
    TabsPage,
    NearbyPage,
    ThreadListPage,
    PostListPage,
    ThreadFormModal,
    PostFormModal,
    LoginModal
  ],
  providers: [
    LocationService,
    ThreadService,
    PostService,
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
