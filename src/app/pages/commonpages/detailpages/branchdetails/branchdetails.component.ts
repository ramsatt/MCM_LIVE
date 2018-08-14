import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {GlobalVariable} from '../../../../global/global';
import {DetailpageService} from '../service/detailpage.service';
declare var $;
declare var swal;
declare var document;
declare var google;

@Component({
  selector: 'app-branchdetails',
  templateUrl: './branchdetails.component.html',
  styleUrls: ['./branchdetails.component.scss']
})
export class BranchdetailsComponent implements OnInit, OnChanges {
  @Input() Branch_ID;
    /* Branch Details */
    SelectedBranchID: any = '';
    BranchDetails: any = [];
    Branch_Name: any;
    Branch_Address: any;
    Branch_City: any;
    Branch_State: any;
    Branch_Country: any;
    Branch_Zip: any;
    Branch_Phone: any;
    Branch_Fax: any;
    Branch_Description: any;
    lat: any = -34.397;
    lng: any = 150.644;
    SiteArray: any;
    AccArray: any;
    site_name: any;
    account_name: any;
    Branch_Email: any;
    Branch_Code: any;
    mobile: any;
    home: any;
    bncoverid: any;
    constructor(private detailpageService: DetailpageService) { }

  ngOnInit() {
  }

    ngOnChanges(changes: SimpleChanges): void {
      this.LoadBranchDetails(this.Branch_ID);
    }

    LoadBranchDetails(Branch_ID) {
      const URL = GlobalVariable.BASE_API_URL + 'branchmaster/viewbranch&id=' + encodeURIComponent(Branch_ID);
        this.detailpageService.GET(URL).subscribe(
            data => {
                this.BranchDetails = data[0];
                this.Branch_Name = this.BranchDetails.BM_Branch_Name;
                this.Branch_Address = this.BranchDetails.BM_Address;
                this.Branch_City = this.BranchDetails.BM_City;
                this.Branch_State = this.BranchDetails.BM_State;
                this.Branch_Country = this.BranchDetails.BM_Country;
                this.Branch_Zip = this.BranchDetails.BM_Zip;
                this.Branch_Phone = this.BranchDetails.BM_Phone;
                this.Branch_Fax = this.BranchDetails.BM_Fax;
                this.Branch_Email = this.BranchDetails.BM_Email;
                this.Branch_Code = this.BranchDetails.BM_Code;
                this.lat = this.BranchDetails.BM_Latitude;
                this.lng = this.BranchDetails.BM_Longitude;
                this.home = this.BranchDetails.BM_Home;
                this.mobile = this.BranchDetails.BM_Mobile;
                this.Branch_Description = this.BranchDetails.BM_Description;
                const bnclat = this.BranchDetails.BM_Latitude;
                const bnclng = this.BranchDetails.BM_Longitude;
                if (this.lat !== '' && this.lng !== '') {
                    const myLatLng = {lat: bnclat, lng: bnclng};

                    const reslong = new google.maps.LatLng(bnclat, bnclng);

                    const map = new google.maps.Map(document.getElementById('branchmap'), {
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
