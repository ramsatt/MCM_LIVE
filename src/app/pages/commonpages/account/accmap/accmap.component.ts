import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
declare var google;
declare var $;

@Component({
  selector: 'app-accmap',
  templateUrl: './accmap.component.html',
  styleUrls: ['./accmap.component.css']
})
export class AccmapComponent implements OnInit, OnChanges {
  @Input() Latitude;
  @Input() Longitude;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.Latitude !== '' && this.Longitude !== '') {
      const reslong = new google.maps.LatLng(this.Latitude, this.Longitude);
      var map = new google.maps.Map(document.getElementById('accmap1'), {
        zoom: 12,
        center: reslong
      });
      var image = 'assets/modules/dummy-assets/common/img/map/account.png';
      var marker = new google.maps.Marker({
        position: reslong,
        map: map,
        title: 'Location',
        icon: image
      });
    }
setTimeout(
    function () {
      google.maps.event.addListenerOnce(map, 'mouseover', function() {
        google.maps.event.trigger(map, 'resize');
      });
    }, 1000);
  }

}
