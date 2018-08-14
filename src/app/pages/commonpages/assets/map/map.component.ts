import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() Lat;
  @Input() Lan;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.Lat = parseFloat(this.Lat);
    this.Lan = parseFloat(this.Lan);
    const myLatLng = {lat: this.Lat, lng: this.Lan};

    const map = new google.maps.Map(document.getElementById('Asset_Map_Show'), {
      zoom: 4,
      center: myLatLng
    });

    const marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
    setTimeout(
        function () {
          google.maps.event.addListenerOnce(map, 'mouseover', function() {
            google.maps.event.trigger(map, 'resize');
          });
        }, 1000);
  }

}
