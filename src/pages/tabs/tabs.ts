import { Component } from '@angular/core';

import { LocationsPage } from '../locations/mylocations/locations';
import { HomePage } from '../home/home';
import { NearbyPage } from '../locations/nearby/nearby.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LocationsPage;
  tab3Root = NearbyPage;

  constructor() {

  }
}
