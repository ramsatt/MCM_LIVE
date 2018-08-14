import { Component, OnInit } from '@angular/core';
import {MenumanagementService} from "../../../commonpages/menumanagement/service/menumanagement.service";
import {UserService} from "../../services/users/user.service";
import {EmailcontentService} from "../../services/emailcontent.service";

declare var $;
declare var swal;

@Component({
    selector: 'app-emailalertassignment',
    templateUrl: './emailalertassignment.component.html',
    styleUrls: ['./emailalertassignment.component.css']
})
export class EmailalertassignmentComponent implements OnInit {
  menuarr:any;
  status:any;
  submenu:any;
  selectedRow: Number = 0;
  setClickedRow: Function;
  demoChk: any = [];
  results:any;
  menuid:any;
  userrole_model:any='';
  accounts:any = '';
  submenuid:any;
  checkenable:any;
  menuselect:any;
  user_role:any;
  acc_br_sit_model:any='';
  user_category:any;
  submenu1:any;
  userlist: any;
  emailcontentsbycat: any;
  Userrole: any;
  emailsettingslist:any=[];
  sessid: any;
  checkboxval: any;
  partexist:any = 'N';
  checked: any='N';
  accountslist: any;
  emailType: any = false;
  selectType : any = '1';
    accID:any='';
  constructor(public menumaster:MenumanagementService,public user:UserService,public emailcontentservice:EmailcontentService) {
    this.sessid=localStorage.getItem('ucmid')
    this.selectedRow = -1;
    this.status = 'active';
    this.setClickedRow = function (index) {
      this.selectedRow = index;

    };

  }

  checkboxfun(ev)
  {
    /*let count = this.userlist.length;
     let partext = '';
     this.emailsettingslist = []; // Empty all values

     if(this.checked=='N') {
     $(function() {
     $(".chkclass").attr("checked", "checked");
     });
     this.checked = 'Y';
     // insert all values
     for(let loopval=0;loopval<count;loopval++)
     {
     let ecmid = this.userlist[loopval].esid;
     let userrole = this.userrole_model;
     let categoryid = this.userlist[loopval].categoryid;
     let acc_br_sit = this.acc_br_sit_model;
     let userid = this.userlist[loopval].userid;
     let createdby = this.sessid;

     if(ecmid)
     {
     partext = 'Y';
     }
     else
     {
     partext = 'N';
     }

     this.emailsettingslist.push({loopval,ecmid,userrole,categoryid,acc_br_sit,userid,createdby,partext});

     /*if(parseInt(this.userlist[loopval]['esid'])==parseInt(ecmid) && parseInt(this.userlist[loopval]['userid'])==parseInt(userid))
     {
     this.partexist = 'Y';
     }
     }

     } else {
     $(function(){
     $(".chkclass").removeAttr("checked");
     });
     this.checked = 'N';
     }
     console.log('after count',this.emailsettingslist.length);
     console.log('after content',this.emailsettingslist);
     */

    this.emailsettingslist = [];
    let partext = '';
    if (ev.target.checked) {
      // set checkbox enable
      this.userlist.forEach(x => x.EAA_Is_Active = 'Y');
      partext = 'Y';
    }
    else{
      this.userlist.forEach(x => x.EAA_Is_Active = 'N');
      partext = 'N';
    }

    // insert values
    for (var i=0; i<this.userlist.length; i++) {
      if(this.userlist[i].esid)
      {
        let ecmid = this.userlist[i].ECMID;
        let esid = this.userlist[i].esid;
        let userrole = this.userrole_model;
        let categoryid = this.userlist[i].categoryid;
        let acc_br_sit = this.acc_br_sit_model;
        let userid = this.userlist[i].userid;
        let createdby = this.sessid;
        this.emailsettingslist.push({ecmid,userrole,categoryid,acc_br_sit,userid,createdby,partext});
      }
    }
  }

  ngOnInit() {
    //this.viewuserrole(1);
    this.viewaccounts();
    //this.viewusercategory();
  }
  viewuserrole(type)
  {
      this.emailcontentservice.loadrole(type).subscribe(
        data => {
          this.user_role = data;
        }
    );
  }
  viewaccounts()
  {
    this.emailcontentservice.loadaccounts().subscribe(
        data => {
          this.accountslist = data;
        }
    );
  }

  setaccount(accid)
  {
    this.accID = accid;
    if(accid)
    {
        this.viewuserrole('1');
    }
    else {
        this.userrole_model = '';
        this.acc_br_sit_model = '';
        this.user_role = [];
        this.user_category = [];
        this.userlist = [];
    }

  }
  viewusers(roleid,catid,accountname)
  {
      // this is for email settings user
    /*this.loademailcontent(catid);
    this.user.Loadusersbycat(catid,ucmkeyid).subscribe(
        data => {
          this.userlist = data;
          for (var i=0; i<this.userlist.length; i++) {
            let partext = 'Y';
            let ecmid = this.userlist[i].ECMID;
            let esid = this.userlist[i].esid;
            let userrole = this.userrole_model;
            let categoryid = this.userlist[i].categoryid;
            let acc_br_sit = this.acc_br_sit_model;
            let userid = this.userlist[i].userid;
            let createdby = this.sessid;

            if(esid=='Y')
            {
              this.emailsettingslist.push({ecmid,userrole,categoryid,acc_br_sit,userid,createdby,partext});
            }
          }
          console.log('before count',this.emailsettingslist.length);
        }
    );*/

      var $table = $('.demo');
      $table.floatThead({
          //useAbsolutePositioning: true,
          scrollContainer: function ($table) {
              return $table.closest('.cover1');
          }
      });

      if(catid)
      {
          this.emailcontentservice.Loadusersbycat(roleid,catid,accountname).subscribe(
              data => {
                  this.userlist = data;
              }
          );
      }
      else {
          this.acc_br_sit_model = '';
          //this.user_category = [];
          this.userlist = [];
      }
  }
  viewusercategory(userrole)
  {
      if(userrole)
      {
          this.emailcontentservice.Loadusercategory(userrole).subscribe(
              data => {
                  this.user_category = data;
                  // console.log(this.user_category.length,'cat Count');
              }
          );
      }
      else {
          this.acc_br_sit_model = '';
          this.user_category = [];
          this.userlist = [];
      }

  }

  loademailcontent(id)
  {
    this.emailcontentservice.loademailcontentbycat(id).subscribe(
        data => {
          this.emailcontentsbycat = data;
        },
    );
  }

  checkrdpartid_original(i,ecmid,userrole,categoryid,acc_br_sit,userid,createdby,event)
  {
    //console.log('contact info',userid,ecmid);
    let count = this.emailsettingslist.length;
    for(let loopval=0;loopval<count;loopval++)
    {
      if(parseInt(this.emailsettingslist[loopval]['ecmid'])==parseInt(ecmid) && parseInt(this.emailsettingslist[loopval]['userid'])==parseInt(userid))
      {
        this.partexist = 'Y';
      }
    }

    if (event.target.checked)
    {
      if(this.partexist=='N')
      {
        let partext = this.partexist;
        this.emailsettingslist.push({ecmid,userrole,categoryid,acc_br_sit,userid,createdby,partext});
      }
      else
      {
        let partext = 'N';
        this.emailsettingslist = this.removeByKey(this.emailsettingslist,{key: 'ecmid',value: ecmid},{key: 'userid',value: userid});
        this.emailsettingslist.push({ecmid,userrole,categoryid,acc_br_sit,userid,createdby,partext});
        //this.partexist = 'N';
      }
    }
    else if (!event.target.checked) {
      //let ind = this.emailsettingslist.indexOf(i);
      //this.emailsettingslist.splice(ind, 1);
      this.emailsettingslist = this.removeByKey(this.emailsettingslist,{key: 'ecmid',value: ecmid},{key: 'userid',value: userid});
      let partext = 'Y';
      this.emailsettingslist.push({ecmid,userrole,categoryid,acc_br_sit,userid,createdby,partext});
      this.partexist = 'N';
    }

  }

  checkrdpartid(i,ecmid,userrole,categoryid,acc_br_sit,userid,createdby,event)
  {
    if (event.target.checked)
    {
      let partext = 'Y';
      this.emailsettingslist = this.removeByKey(this.emailsettingslist,{key: 'ecmid',value: ecmid},{key: 'userid',value: userid});
      this.emailsettingslist.push({ecmid,userrole,categoryid,acc_br_sit,userid,createdby,partext});
    }
    else if (!event.target.checked) {
      let partext = 'N';
      this.emailsettingslist = this.removeByKey(this.emailsettingslist,{key: 'ecmid',value: ecmid},{key: 'userid',value: userid});
      this.emailsettingslist.push({ecmid,userrole,categoryid,acc_br_sit,userid,createdby,partext});
    }

  }

  removeByKey(array, params, params2)
  {
    array.some(function(item, index) {
      return ( array[index][params.key] === params.value && array[index][params2.key] === params2.value ) ? !!(array.splice(index, 1)) : false;
    });
    return array;
  }

  updateParts(params)
  {

    //console.log('emailsettingslist OP',this.emailsettingslist);
    $('#loader').show();

    this.emailcontentservice.Assignemail(params).subscribe(
        data => {
          $('#loader').hide();
          $("#loader").css("visibility", "hidden");
          if ( data.result === 'success' ) {
            swal({
              title: 'Assigned!',
              text: 'Email Assigned Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });

            this.emailsettingslist = [];
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

    emailTypeset(param)
    {
        //this.accountslist = [];
        this.user_role = [];
        this.user_category = [];
        this.userlist = [];
        //this.accountslist = [];
        this.accounts = '';
        this.userrole_model = '';
        this.acc_br_sit_model = '';

        if(param==2) // for admin
        {
            this.emailType = true;
            this.viewuserrole(param);
        }
        else // for account
        {
            this.emailType = false;
            //this.viewuserrole(param);
        }
    }

}

