import { Component} from '@angular/core';

@Component({
  selector: 'app-home-page',
  template:
      `<div class="text-center">
    <h1>Welcome to the home page</h1>
    <a routerLink="/music-group" class="btn btn-primary">Start here</a>
  </div>`
})
export class HomePageComponent {
  constructor() { }
}
