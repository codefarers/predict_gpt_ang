import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PREDICT_NAVBAR_LINKS } from './helpers/constants';

@Component({
  selector: 'app-predict-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './predict-navbar.html',
})
export class PredictNavbar {
  navBarLinkItems = PREDICT_NAVBAR_LINKS;
}
