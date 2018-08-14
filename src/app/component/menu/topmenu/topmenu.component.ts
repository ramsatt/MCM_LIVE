import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from "../../../pages/settings/services/users/user.service";
import {MenumanagementService} from "../../../pages/commonpages/menumanagement/service/menumanagement.service";
import {GlobalVariable} from "../../../global/global";
import {GeneralsettingsService} from "../../../pages/settings/services/generalsettings.service";


declare var  $;
@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
    umid: any;
    alluser: any;
    username: any;
    lastname: any;
    Asssubmenu: any;
    Asssubbutton: any;
    add: any;
    edit: any;
    delete: any;
    sessid: any;
    umkeyid: any;
    urmid:any;
    id:any;
    image:any;
    imgurl:any;
    showimg:any;
    globalIRid: any;
    gs_logo:any;
    logo_img:any;
    load_gen:any;

  constructor( public router: Router,public gen:GeneralsettingsService, public user: UserService ,private actRoute: ActivatedRoute,public menu: MenumanagementService) {
      this.sessid = localStorage.getItem('ucmid');
      this.urmid=localStorage.getItem('urmid');
      this.showimg = GlobalVariable.BASE_FILE_API;
      this.Loadbuttons();
    this.umid = localStorage.getItem('umid');
    this.Viewuser();
      this.LoadGenral();
    if (localStorage.getItem('ucmid')) {


    } else {
      this.router.navigate(['/login']);
    }
    if(this.actRoute.snapshot.params['irID'])
    {
      this.globalIRid = this.actRoute.snapshot.params['irID'];
      localStorage.setItem('globalIRid', this.globalIRid);
    }
    else
    {

    }
  }

  ngOnInit() {
      $('#loader').hide();
  }

  Navigation(link){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  Viewuser() {
    this.user.Loadusername(this.umid,this.urmid).subscribe(
        data => {
          this.alluser = data;
          if (this.alluser[0].firstname !== '') {
          this.username = this.alluser[0].firstname;
          } else {
              this.username = '';
          }
          if (this.alluser[0].lastname !== '') {
            this.lastname = this.alluser[0].lastname;
          } else {
            this.lastname = '';
          }
            if (this.alluser[0].id !== '') {
                this.id = this.alluser[0].id;
            } else {
                this.id = '';
            }
            if (this.alluser[0].image !== '') {
                this.image = this.alluser[0].image;
            } else {
                this.image = '';
            }
            if(this.urmid==1)
            {
                this.imgurl=this.showimg+'/uploads/user_images/admin_images/avatars/'+this.image;
            }
            else if (this.urmid==2)
                {
                    this.imgurl=this.showimg+'uploads/user_images/'+this.id+'/avatars/'+this.image;

                }
            else if (this.urmid==3)
            {
                this.imgurl=this.showimg+'uploads/user_images/siteuser/'+this.id+'/avatars/'+this.image;

            }
            else if (this.urmid==4)
            {
                this.imgurl=this.showimg+'uploads/user_images/branch/'+this.id+'/avatars/'+this.image;

            }
            else if (this.urmid==5)
            {
                this.imgurl=this.showimg+'uploads/user_images/supplier/'+this.id+'/avatars/'+this.image;

            }
            else if (this.urmid==7)
            {
                this.imgurl=this.showimg+'/'+this.image;

            }

        } );
  }
  Loadbuttons() {
      this.menu.Loadbutton(5, 17, this.sessid).subscribe(
          data => {
              this.Asssubbutton = data;
              this.add = this.Asssubbutton[0].MA_Add;
              }
        );
  }
    LoadGenral()
    {
        this.gen.loadgeneral().subscribe(
            data => {
                this.load_gen = data;

                this.gs_logo=data[0].GS_Logo;
                this.logo_img = GlobalVariable.BASE_FILE_API+'uploads/logo/'+this.gs_logo;

            }

        );


    }
}
