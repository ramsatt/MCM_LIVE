import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class IncidentreportService {

  constructor(public http: HttpClient) { }

  public Get(URL) {
    const response = this.http.get(URL);
    return response;
  }

  public Post(URL, formData) {
    const response = this.http.post(URL, formData);
    return response;
  }

  public Submit(URL, formData) {
    const response = this.http.post(URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
    return response;
  }
}
