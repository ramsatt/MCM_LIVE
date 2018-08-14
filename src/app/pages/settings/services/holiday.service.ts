import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from '../../../global/global';

@Injectable()
export class HolidayService {

  constructor(public http: Http) { }
  Loadholiday(){
    const url = GlobalVariable.BASE_API_URL + 'holiday/holi';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  holi(id) {
    const url = GlobalVariable.BASE_API_URL + 'holiday/holi&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Createholi(name, date, dateto, notes) {
    const url = GlobalVariable.BASE_API_URL + 'holiday/add&fes_name=' + encodeURIComponent(name) + '&fes_date=' + encodeURIComponent(date) + '&notes=' + encodeURIComponent(notes) + '&festo_date=' + encodeURIComponent(dateto);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Delholi(id) {
    const url = GlobalVariable.BASE_API_URL + 'holiday/delete&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  Editholi(name, date, notes, id) {
    const url = GlobalVariable.BASE_API_URL + 'holiday/edit&fes_name=' + encodeURIComponent(name) + '&fes_date=' + encodeURIComponent(date) + '&fes_notes=' + encodeURIComponent(notes) + '&holiid=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
