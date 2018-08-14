import { Component, OnInit } from '@angular/core';
import { FooterService } from '../services/footer/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Application_Name: any = '';
  Copy_Right: any = '';
  Contact_Mail: any = '';
  Contact_Number_Dispatch: any = '';
  Contact_Number_After_Hours: any = '';
  FooterInfoArray: any = [];

  constructor( public footSer: FooterService) { }

  ngOnInit() {
    this.LoadInfo();
  }

  LoadInfo() {
    this.footSer.LoadFooterInfo().subscribe(
        data => {
          this.FooterInfoArray = data;
          this.Application_Name = this.FooterInfoArray[0].GS_Application_Name;
          this.Copy_Right = this.FooterInfoArray[0].GS_Company_Copyright;;
          this.Contact_Mail = this.FooterInfoArray[0].GS_Company_Email;;
          this.Contact_Number_Dispatch = this.FooterInfoArray[0].GS_Dispatch;;
          this.Contact_Number_After_Hours = this.FooterInfoArray[0].GS_After_Hours;
        }
    );
  }

}
