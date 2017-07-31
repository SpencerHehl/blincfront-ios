import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { NearMePage } from '../posts/nearme/nearme.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NearMePage;

  constructor() {

  }
}
