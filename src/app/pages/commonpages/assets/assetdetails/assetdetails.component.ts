import {Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import {AssetsService} from '../services/assets.service';


@Component({
  selector: 'app-assetdetails',
  templateUrl: './assetdetails.component.html',
  styleUrls: ['./assetdetails.component.scss']
})
export class AssetdetailsComponent implements OnInit, OnChanges {
    @Input() Asset_ID;
  assdetail: any = [];
    AssName: any = '';
    ass_sno: any = '';
    ass_model: any = '';
    ass_from: any = '';
    ass_to: any = '';
    siteov_name: any = '';
    SiteLat: any = '';
    SiteLng: any = '';
    ass_iden: any = '';
    AM_KeyID: any = '';
    AGMStatus: any = '';
    AGMID: any = '';
    AgreementName: any = '';

  constructor(private ass: AssetsService) { }

  ngOnInit() {
  }

    ngOnChanges(changes: SimpleChanges): void {
        this.viewass(this.Asset_ID);
    }

    viewass(Ass_ID){
        this.ass.Editass(Ass_ID).subscribe(
            data => {
                this.assdetail = data;
                this.AssName = this.assdetail[0].ASM_Asset_Name;
                this.ass_sno = this.assdetail[0].ASM_Serial_No;
                this.ass_model = this.assdetail[0].MM_Model_Name;
                this.ass_from = this.assdetail[0].ASM_Datefrom;
                this.ass_to = this.assdetail[0].ASM_Dateto;
                this.siteov_name = this.assdetail[0].SM_SiteName;
                this.SiteLat = this.assdetail[0].SM_Latitude;
                this.SiteLng = this.assdetail[0].SM_Longitude;
                this.ass_iden = this.assdetail[0].ASM_ID;
                this.AM_KeyID = this.assdetail[0].SAD_AM_KeyID;
                this.AGMStatus = this.assdetail[0].ASM_Agreement_Status;
                this.AGMID = this.assdetail[0].ASM_AGM_KeyID;
                this.AgreementName = this.assdetail[0].AGM_Agreement_Name;
            }
        );
    }
}
