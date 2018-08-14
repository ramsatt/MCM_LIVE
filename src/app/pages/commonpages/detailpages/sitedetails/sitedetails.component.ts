import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {GlobalVariable} from '../../../../global/global';
import {DetailpageService} from '../service/detailpage.service';
declare var $;
declare var swal;
declare var document;
declare var google;

@Component({
  selector: 'app-sitedetails',
  templateUrl: './sitedetails.component.html',
  styleUrls: ['./sitedetails.component.scss']
})
export class SitedetailsComponent implements OnInit, OnChanges {
    /* Site_Details */
    @Input() SiteID;
    SiteName: any;
    SiteAddress: any;
    SiteCity: any;
    SiteState: any;
    SiteCountry: any;
    SiteZIP: any;
    SitePhone: any;
    SiteMobile: any;
    SiteHomePhone: any;
    SiteFax: any;
    SiteDescription: any;
    SiteAccountNumber: any = '';
    Sitecontactperson: any = '';
    lat: any;
    lng: any;
    SiteDetails: any = [];

  constructor(private detailpageService: DetailpageService) { }

  ngOnInit() {
  }
    ngOnChanges(changes: SimpleChanges): void {
    this.LoadSiteDetails(this.SiteID);
    }

    LoadSiteDetails(Site_ID) {
      const URL = GlobalVariable.BASE_API_URL + 'sitemaster/sitedetail&id=' + encodeURIComponent(Site_ID);
        this.detailpageService.GET(URL).subscribe(
            data => {
                this.SiteDetails = data;
                this.SiteName = this.SiteDetails.SM_SiteName;
                this.SiteAddress = this.SiteDetails.SM_Address;
                this.SiteCity = this.SiteDetails.SM_City;
                this.SiteState = this.SiteDetails.SM_State;
                this.SiteCountry = this.SiteDetails.SM_Country;
                this.SiteZIP = this.SiteDetails.SM_Zip;
                this.SitePhone = this.SiteDetails.SM_Phone;
                this.SiteFax = this.SiteDetails.SM_Fax;
                this.SiteDescription = this.SiteDetails.SM_Description;
                this.lat = this.SiteDetails.SM_Latitude;
                this.lng = this.SiteDetails.SM_Longitude;
                this.SiteAccountNumber = this.SiteDetails.SM_AccountNumber;
                this.SiteMobile = this.SiteDetails.SM_Mobile;
                this.SiteHomePhone = this.SiteDetails.SM_Home_Phone;
                this.Sitecontactperson = this.SiteDetails.SM_Contact_Person;

                const sitelat = this.SiteDetails.SM_Latitude;
                const sitelng = this.SiteDetails.SM_Longitude;

                if (this.lat !== '' && this.lng !== '') {
                    const myLatLng = {lat: sitelat, lng: sitelng};

                    const reslong = new google.maps.LatLng(sitelat, sitelng);

                    const map = new google.maps.Map(document.getElementById('sitemap'), {
                        zoom: 12,
                        center: reslong
                    });

                    const marker = new google.maps.Marker({
                        position: reslong,
                        map: map,
                        title: 'Hello World!'
                    });
                    marker.setPosition(reslong);
                    setTimeout(
                        function () {
                            google.maps.event.addListenerOnce(map, 'mouseover', function() {
                                google.maps.event.trigger(map, 'resize');
                            });
                        }, 1000);
                }
            }
        );
    }
}
