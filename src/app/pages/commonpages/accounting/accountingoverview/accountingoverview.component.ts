import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import {Router} from '@angular/router';
import {RequestService} from "../../branch/services/request.service";
import {DomSanitizer} from "@angular/platform-browser";
import {GlobalVariable} from "../../../../global/global";
import {AccountsService} from "../../../../services/accounts/accounts.service";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";


declare var $;
declare var swal;

@Component({
  selector: 'app-accountingoverview',
  templateUrl: './accountingoverview.component.html',
  styleUrls: ['./accountingoverview.component.scss']
})
export class AccountingoverviewComponent implements OnInit {

  @ViewChild('ShipmentDate') public AGM_EffectiveDate_Arr: ElementRef;
  @ViewChild('RequestDate') public AGM_EffectiveDate_Arrs: ElementRef;

    requestall: any;
    requestallparts: any;
    Request_ID: any;
    Request_Type: any;
    selectedRow: Number = 0;
    setClickedRow: Function;
    Requestinfo: any;
    RPM_KeyID: any;
    RPM_Request_Date: any;
    RPM_Request_Type: any;
    BM_Name: any;
    Contact_Name: any ='';
    Contact_Email: any ='';
    Status: any;
    Shipment_Date: any;
    Payment_Term: any;
    Notes: any;
    Shipment_Type: any ='';
    Request_From: any ='';
    Herokit_Value: any ='';
    Ship_To_Name: any ='';
    Ship_To_Company: any =' ';
    Ship_To_Street: any ='';
    Ship_To_City: any ='';
    Ship_To_ST: any ='';
    Ship_To_Zip: any ='';
    Ship_To_Country: any ='';
    Bill_To_Name: any ='';
    Bill_To_Company: any = ' ';
    Bill_To_Street: any ='';
    Bill_To_City: any ='';
    Bill_To_ST: any ='';
    Bill_To_Zip: any ='';
    Bill_To_Country: any ='';
    POM_PurchaseOrder_Path: any;
    Manufacturer: any = 'Account';
    Branch: any = 'Branch';
    Supplier: any = 'Supplier';
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    viewbtn:any;
    sessid:any;
    umkeyid:any;
  constructor(public router: Router,private domSanitizer : DomSanitizer, public requestService: RequestService,public acc:AccountsService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid')
      this.umkeyid=localStorage.getItem('umid');
      this.setClickedRow = function (index) {
         ;
          this.selectedRow = index;

      };
  }

  ngOnInit() {
    this.LoadRequest();
    this.LoadRequestparts();
      this.Loadsubmenu();
      this.Loadbuttons();

      $('.datepicker-only-init').datetimepicker({
          format: 'MM/DD/Y',
          minDate: 0,
          widgetPositioning: {
              horizontal: 'left'
          }
      });
  }

  selectRequestDetails(id,type) {
    this.Requestbyid(id,type);
  }

  LoadRequest() {
    this.requestService.LoadRequest(this.Manufacturer,this.Branch,this.Supplier,this.umkeyid,this.sessid).subscribe(
        data => {
          this.requestall = data;
          //console.log('Recide',this.requestall);

          this.requestall.sort((a, b) => {
            if (a.BM_Branch_Name < b.BM_Branch_Name) return -1;
            else if (a.BM_Branch_Name > b.BM_Branch_Name) return 1;
            else return 0;
          });
          this.Request_ID = this.requestall[0].RPM_KeyID;
          this.Request_Type = this.requestall[0].RPM_Request_Type;
          this.Requestbyid(this.Request_ID,this.Request_Type);
        }
    );
  }

  LoadRequestparts() {

      var $table = $('.demo');
      $table.floatThead({
          //useAbsolutePositioning: true,
          scrollContainer: function ($table) {
              return $table.closest('.cover1');
          }
      });

        this.requestService.LoadRequestparts().subscribe(
            data => {
                this.requestallparts = data;
                //console.log('All Datas',this.requestallparts);

                this.requestallparts.sort((a, b) => {
                    if (a.BM_Branch_Name < b.BM_Branch_Name) return -1;
                    else if (a.BM_Branch_Name > b.BM_Branch_Name) return 1;
                    else return 0;
                });
            }
        );
  }

  Requestbyid(id,type) {
    this.requestService.Requestbyid(id,type).subscribe(
        data=> {
            this.Requestinfo = JSON.stringify(data);
            this.RPM_KeyID = data[0].RPM_KeyID;
            var rd = new Date(data[0].RPM_Request_Date);
            var op = (rd.getMonth()+1)+'/'+rd.getDate()+'/'+(rd.getFullYear());
            this.RPM_Request_Date = data[0].RPM_Request_Date;
            this.RPM_Request_Type = data[0].RPM_Request_Type;
            this.BM_Name = data[0].Name;
            //this.Shipment_Date = data[1].Shipment_Date;
            var d = new Date(data[1].Shipment_Date);
            var op2 = (d.getMonth()+1)+'/'+d.getDate()+'/'+(d.getFullYear());
            this.Shipment_Date = data[1].Shipment_Date;

            this.Notes = data[1].Notes;
            this.Shipment_Type = data[1].Shipment_Type;
            this.Status = data[1].Status;
            this.Payment_Term = data[1].Payment_Term;
            this.Contact_Name = data[1].Contact_Name;
            this.Contact_Email = data[1].Contact_Email;
            this.Request_From = data[1].Ship_To_Name;
            this.Herokit_Value = data[1].Herokit_Value;
            this.Ship_To_Name = data[1].Ship_To_Name;
            this.Ship_To_Company = data[1].Ship_To_Company;
            this.Ship_To_Street = data[1].Ship_To_Street;
            this.Ship_To_City = data[1].Ship_To_City;
            this.Ship_To_ST = data[1].Ship_To_ST;
            this.Ship_To_Zip = data[1].Ship_To_Zip;
            this.Ship_To_Country = data[1].Ship_To_Country;

            this.Bill_To_Name = data[1].Bill_To_Name;
            this.Bill_To_Company = data[1].Bill_To_Company;
            this.Bill_To_Street = data[1].Bill_To_Street;
            this.Bill_To_City = data[1].Bill_To_City;
            this.Bill_To_ST = data[1].Bill_To_ST;
            this.Bill_To_Zip = data[1].Bill_To_Zip;
            this.Bill_To_Country = data[1].Bill_To_Country;
            //this.POM_PurchaseOrder_Path = data[1].POM_PurchaseOrder_Path;
            this.POM_PurchaseOrder_Path = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API+data[1].POM_PurchaseOrder_Path);
        }
    );

      this.requestService.Requestpartsbyid(id,type).subscribe(
          data=> {
              this.requestallparts = data;
          }
      );

  }
    setBilladdress()
    {
        this.Bill_To_Name = this.Ship_To_Name;
        this.Bill_To_Company = this.Ship_To_Company;
        this.Bill_To_Street = this.Ship_To_Street;
        this.Bill_To_City = this.Ship_To_City;
        this.Bill_To_ST = this.Ship_To_ST;
        this.Bill_To_Zip = this.Ship_To_Zip;
        this.Bill_To_Country = this.Ship_To_Country;
    }

    updateRequest(form)
    {
        //console.log(form);
        this.requestService.UpdateRequest(form).subscribe(
            data => {
                if ( data.result === 'success' ) {
                    swal({
                        title: 'Update!',
                        text: 'Request Parts Details Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            },
            err => {
                swal({
                    title: 'Error',
                    text: 'Error occurs, please try after some time.',
                    type: 'error',
                    confirmButtonClass: 'btn-danger'
                });

            },
        );
    }

    updateQuantity(qty,rpdid)
    {
        this.requestService.updateQuantity(qty,rpdid,this.RPM_KeyID).subscribe(
            data => {
                if ( data.result === 'success' ) {
                    swal({
                        title: 'Update!',
                        text: 'Quantity Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });

                    this.Requestbyid(this.RPM_KeyID,this.Request_Type);
                }
            },
            err => {
                swal({
                    title: 'Error',
                    text: 'Error occurs, please try after some time.',
                    type: 'error',
                    confirmButtonClass: 'btn-danger'
                });

            },
        );
    }

    changeAccount(event) {
        if (event.target.checked) {
            this.Manufacturer = 'Account';
        } else if (!event.target.checked) {
            this.Manufacturer = '';
        }
        this.LoadRequest();
    }

    changeSupplier(event) {
        if (event.target.checked) {
            this.Supplier = 'Supplier';
        } else if (!event.target.checked) {
            this.Supplier = '';
        }
        this.LoadRequest();
    }

    changeBranch(event) {
        if (event.target.checked) {
            this.Branch = 'Branch';
        } else if (!event.target.checked) {
            this.Branch = '';
        }
        this.LoadRequest();
    }

    /*LoadMapDatas(siteID) {
        this.siteService.LoadMapdata(this.SiteID, this.Account, this.Site, this.Branch).subscribe(
            data => {
                this.mapArray = data;
                console.log('data');
                console.log(this.mapArray);
            }
        );
    }*/
    Loadsubmenu() {
        this.acc.Loadmenu(9).subscribe(
            data => {
                this.Asssubmenu = data;
            }
            //() => console.log('site loaded')
        );

    }
    Loadbuttons() {
        this.menu.Loadbutton(9,33,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;
                this.viewbtn=this.Asssubbutton[0].MA_View;
            },
            err => {
                //console.log(err);
            },
            //() => console.log('site loaded')
        );

    }
}
