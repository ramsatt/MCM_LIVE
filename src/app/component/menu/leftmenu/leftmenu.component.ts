import { Component, OnInit } from '@angular/core';
import {MenumanagementService} from '../../../pages/commonpages/menumanagement/service/menumanagement.service';
import {GeneralsettingsService} from "../../../pages/settings/services/generalsettings.service";
import {GlobalVariable} from "../../../global/global";



declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {
  menu: any;
  sessid: any = '';
  loginmenu: any;
  gs_logo: any;
  logo_img: any;
  load_gen: any;
  constructor(public menuass: MenumanagementService, public gen: GeneralsettingsService) {
    /*this.menu = [
     {'title': 'Home', 'link': '/admin/dashboard', 'icon': 'home'},
     {'title': 'Manufacturer', 'link': '/account/overview', 'icon': 'books'},
     {'title': 'Sites', 'link': '/site/overview', 'icon': 'library'},
     {'title': 'Assets', 'link': '/assets', 'icon': 'list2'},
     {'title': 'Tickets', 'link': '/tickets/overview', 'icon': 'ticket'},
     {'title': 'Dispatch', 'link': '/dispatch', 'icon': 'truck'},
     {'title': 'Schedule', 'link': '/schedule', 'icon': 'calendar'},
     {'title': 'Branches', 'link': '/branch/overview', 'icon': 'library'},
     {'title': 'Accounting', 'link': '/accounting/overview', 'icon': 'stack'},
     {'title': 'Reports', 'link': '/reports/reports', 'icon': 'profile'},
     {'title': 'Inventory', 'link': '/part/overview', 'icon': 'hammer'},
     {'title': 'Settings', 'link': '/settings', 'icon': 'cog'}
     ];*/
  }
  ngOnInit() {
     let sessid1 = localStorage.getItem('ucmid');
    this.sessid = localStorage.getItem('ucmid');
    this.LoadGenral();
      this.Loadmenu(this.sessid);
    $(function(){
      // scripts for "menu-left" module
      /////////////////////////////////////////////////////////////////////////////////////////
      // add backdrop
      $('.cat__menu-left').after('<div class="cat__menu-left__backdrop cat__menu-left__action--backdrop-toggle"><!-- --></div>');
      /////////////////////////////////////////////////////////////////////////////////////////
      // submenu
      $('.cat__menu-left__submenu > a').on('click', function(){
        if ($('body').hasClass('cat__config--vertical') || $('body').width() < 768) {
          var parent = $(this).parent(),
              opened = $('.cat__menu-left__submenu--toggled');
          if (!parent.hasClass('cat__menu-left__submenu--toggled') && !parent.parent().closest('.cat__menu-left__submenu').length)
            opened.removeClass('cat__menu-left__submenu--toggled').find('> .cat__menu-left__list').slideUp(200);
          parent.toggleClass('cat__menu-left__submenu--toggled');
          parent.find('> .cat__menu-left__list').slideToggle(200);
        }
      });
      // remove submenu toggle class when viewport back to full view
      $(window).on('resize', function(){
        if ($('body').hasClass('cat__config--horizontal') || $('body').width() > 768) {
          $('.cat__menu-left__submenu--toggled').removeClass('cat__menu-left__submenu--toggled').find('> .cat__menu-left__list').attr('style', '');
        }
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      // custom scroll init
      if ($('body').hasClass('cat__config--vertical')) {
        if (!(/Mobi/.test(navigator.userAgent)) && jQuery().jScrollPane) {
          $('.cat__menu-left__inner').each(function () {
            $(this).jScrollPane({
              contentWidth: '0px',
              autoReinitialise: true,
              autoReinitialiseDelay: 100
            });
            var api = $(this).data('jsp'),
                throttleTimeout;
            $(window).bind('resize', function () {
              if (!throttleTimeout) {
                throttleTimeout = setTimeout(function () {
                  api.reinitialise();
                  throttleTimeout = null;
                }, 50);
              }
            });
          });
        }
      }
      /////////////////////////////////////////////////////////////////////////////////////////
      // toggle menu
      $('.cat__menu-left__action--menu-toggle').on('click', function(){
        if ($('body').width() < 768) {
          $('body').toggleClass('cat__menu-left--visible--mobile');
        } else {
          $('body').toggleClass('cat__menu-left--visible');
        }
      });
      $('.cat__menu-left__action--backdrop-toggle').on('click', function(){
        $('body').removeClass('cat__menu-left--visible--mobile');
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      // colorful menu
      var colorfulClasses = 'cat__menu-left--colorful--primary cat__menu-left--colorful--secondary cat__menu-left--colorful--primary cat__menu-left--colorful--default cat__menu-left--colorful--info cat__menu-left--colorful--success cat__menu-left--colorful--warning cat__menu-left--colorful--danger cat__menu-left--colorful--yellow',
          colorfulClassesArray = colorfulClasses.split(' ');
      function setColorfulClasses() {
        $('.cat__menu-left__list--root > .cat__menu-left__item').each(function(){
          var randomClass = colorfulClassesArray[Math.floor(Math.random() * colorfulClassesArray.length)];
          $(this).addClass(randomClass);
        });
      }
      function removeColorfulClasses() {
        $('.cat__menu-left__list--root > .cat__menu-left__item').removeClass(colorfulClasses);
      }
      if ($('body').hasClass('cat__menu-left--colorful')) {
        setColorfulClasses();
      }
      $('body').on('setColorfulClasses', function() {
        setColorfulClasses();
      });
      $('body').on('removeColorfulClasses', function() {
        removeColorfulClasses();
      });
    });
  }

  Loadmenu(sessionID) {
    this.menuass.LoadMainenu(sessionID).subscribe(
        data => {
          this.menu = data;
        }
    );
  }

  LoadGenral() {
    this.gen.loadgeneral().subscribe(
        data => {
          this.load_gen = data;
          this.gs_logo = data[0].GS_Logo;
          this.logo_img = GlobalVariable.BASE_FILE_API + 'uploads/logo/' + this.gs_logo;
        }
    );
  }
}
