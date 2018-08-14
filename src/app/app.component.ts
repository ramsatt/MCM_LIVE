import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {LeftmenuComponent} from './component/menu/leftmenu/leftmenu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  sessid: any = '';
  isLoggedIn: any;
  constructor(public router: Router, private leftmen: LeftmenuComponent) {

  }
  ngOnInit() {
/*console.log('eee'+this.leftmen.sessid1);*/
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const urlSlice = e.url.toString().substr(0, 10);
        if (urlSlice.indexOf('login') !== -1){
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = true;
        }
      }
    });
    this.isLoggedIn = localStorage.getItem('isLoggedIN');
  }
}
