import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {SiteService} from '../service/site.service';
declare var google;
declare var MarkerClusterer;

@Component({
  selector: 'app-sitemapdetails',
  templateUrl: './sitemapdetails.component.html',
  styleUrls: ['./sitemapdetails.component.css']
})
export class SitemapdetailsComponent implements OnInit, OnChanges {

  @Input() SiteID;
  @Input() stStatus;
  mapArray: any = [];
  Account: any = 'true';
  Branch: any = 'true';
  Site: any = 'true';
  constructor( public siteService: SiteService) {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    const that = this;
    that.LoadMapDatas(this.SiteID);
    setTimeout( function () {
      that.LoadMap();
    }, 3000 );
  }

  changeAccount(event) {
    if (event.target.checked) {
      this.Account = 'true';
      const that = this;
      this.LoadMapDatas(this.SiteID);
      setTimeout( function () {
        that.LoadMap();
      }, 3000 );
    } else if (!event.target.checked) {
      this.Account = 'false';
      const that = this;
      this.LoadMapDatas(this.SiteID);
      setTimeout( function () {
        that.LoadMap();
      }, 3000 );
    }
  }

  changeSite(event) {
    if (event.target.checked) {
      this.Site = 'true';
      const that = this;
      this.LoadMapDatas(this.SiteID);
      setTimeout( function () {
        that.LoadMap();
      }, 3000 );
    } else if (!event.target.checked) {
      this.Site = 'false';
      const that = this;
      this.LoadMapDatas(this.SiteID);
      setTimeout( function () {
        that.LoadMap();
      }, 3000 );
    }
  }

  changeBranch(event) {
    if (event.target.checked) {
      this.Branch = 'true';
      const that = this;
      this.LoadMapDatas(this.SiteID);
      setTimeout( function () {
        that.LoadMap();
      }, 3000 );
    } else if (!event.target.checked) {
      this.Branch = 'false';
      const that = this;
      this.LoadMapDatas(this.SiteID);
      setTimeout( function () {
        that.LoadMap();
      }, 3000 );
    }
  }

  LoadMapDatas(siteID) {
    this.siteService.LoadMapdata(this.SiteID, this.Account, this.Site, this.Branch).subscribe(
        data => {
          this.mapArray = data;
        }
    );
  }

  LoadMap() {
    const mapStyle = [
      {
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#242f3e'
          }
        ]
      },
      {
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#746855'
          }
        ]
      },
      {
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#242f3e'
          }
        ]
      },
      {
        'featureType': 'administrative.locality',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#d59563'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#d59563'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#263c3f'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#6b9a76'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#38414e'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#212a37'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9ca5b3'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#746855'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#1f2835'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#f3d19c'
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#2f3948'
          }
        ]
      },
      {
        'featureType': 'transit.station',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#d59563'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#17263c'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#515c6d'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#17263c'
          }
        ]
      }
    ];

    const map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 4,
      styles: mapStyle,
      center: {lat: 33.242136, lng: -94.597434}
    });

    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


    const length = this.mapArray.length;
    const markers = this.mapArray.map(function(location, i) {
      const contentString = location.name + '<br>' + location.address + '<br>' + location.city;
      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      let image;

      if (location.type === 'account') {
        image = 'assets/images/map/markers/account.png';
      } else if (location.type === 'branch') {
        image = 'assets/images/map/markers/branch.png';
      } else if (location.type === 'primary') {
        image = 'assets/images/map/markers/primary_branch.png';
      } else if (location.type === 'site') {
        image = 'assets/images/map/markers/site.png';
      }
      const marker =  new google.maps.Marker({
        position: {'lat': parseFloat( location.latitude), 'lng': parseFloat( location.longitude)},
        icon: image
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      return marker;
    });

    const markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    setTimeout(
        function () {
          google.maps.event.addListenerOnce(map, 'mouseover', function() {
            google.maps.event.trigger(map, 'resize');
          });
        }, 1000);
  }

}
