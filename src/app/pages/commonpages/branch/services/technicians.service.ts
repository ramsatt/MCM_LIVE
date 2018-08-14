import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from "../../../../global/global";


@Injectable()
export class TechniciansService {

  constructor(private http: Http) { }

  LoadCertifications(){
    let url = GlobalVariable.BASE_API_URL+'technicianmaster/certifications';
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadCertificationsbyid(id){
      let url = GlobalVariable.BASE_API_URL+'technicianmaster/certificationsbyid&id='+id;
      let response = this.http.get(url).map(res => res.json());
      return response;
  }

    LoadCertificationsskillsbyid(id){
        let url = GlobalVariable.BASE_API_URL+'technicianmaster/certificationsskillsbyid&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
  }

  LoadExperience(){
    let url = GlobalVariable.BASE_API_URL+'technicianmaster/experience';
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

   LoadExperiencebyid(id){
        let url = GlobalVariable.BASE_API_URL+'technicianmaster/experiencebyid&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
   }

    LoadExperienceskillsbyid(id){
        let url = GlobalVariable.BASE_API_URL+'technicianmaster/experienceskillsbyid&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  LoadSecurity(){
    let url = GlobalVariable.BASE_API_URL+'technicianmaster/security';
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadSecuritybyid(id){
        let url = GlobalVariable.BASE_API_URL+'technicianmaster/securitybyid&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
  }

    LoadSecurityskillsbyid(id){
        let url = GlobalVariable.BASE_API_URL+'technicianmaster/securityskillsbyid&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  addTechnician(info){
    let url = GlobalVariable.BASE_API_URL+'technicianmaster/createuser';
    let response = this.http.post(url, info).map(res => res.json());
    return response;
  }
    checkunique(email,id)
    {
        const url = GlobalVariable.BASE_API_URL + 'accountuser/checkunique&email='+encodeURIComponent(email)+'&id='+encodeURIComponent(id);
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
  updateTechnician(info){
    let url = GlobalVariable.BASE_API_URL+'technicianmaster/updateuser';
    let response = this.http.post(url, info).map(res => res.json());
    return response;
  }

    public CheckUserName(name) {
        const url = GlobalVariable.BASE_API_URL + 'technicianmaster/usernamecheck';
        const response = this.http.post(url, { 'userName': name }).map(res => res.json());
         return response;
    }

    listTechnicians(id){
        let url = GlobalVariable.BASE_API_URL+'technicianmaster/index&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  UpdateExperienced(Postval){
    return this.http.post(GlobalVariable.BASE_API_URL+'technicianmaster/updateexperience', Postval)
        .map(res => res.json());

  }

  UpdateCertification(Postval){
    return this.http.post(GlobalVariable.BASE_API_URL+'technicianmaster/updatecertification', Postval)
        .map(res => res.json());

  }

  UpdateSecurity(Postval){
    return this.http.post(GlobalVariable.BASE_API_URL+'technicianmaster/updatesecurity', Postval)
        .map(res => res.json());

  }

// Only for Update
    UpdateExperienceds(Postval){
        return this.http.post(GlobalVariable.BASE_API_URL+'technicianmaster/updateexperiences', Postval)
            .map(res => res.json());

    }

    UpdateCertifications(Postval){
        return this.http.post(GlobalVariable.BASE_API_URL+'technicianmaster/updatecertifications', Postval)
            .map(res => res.json());

    }

    UpdateSecuritys(Postval){
        return this.http.post(GlobalVariable.BASE_API_URL+'technicianmaster/updatesecuritys', Postval)
            .map(res => res.json());

    }

  findTecnicianbyId(id){
    let url = GlobalVariable.BASE_API_URL+'technicianmaster/findbyid&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    deleteTecnicianbyId(userid,technicianid){
        let url = GlobalVariable.BASE_API_URL+'technicianmaster/deletebyid&userid='+userid+'&technicianid='+technicianid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }
}
