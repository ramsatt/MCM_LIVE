import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DetailpageService {

  constructor(private http: Http) {
  }
    GET(URL) {
        const response = this.http.get(URL).map(res => res.json());
        return response;
    }

    POST(URL, Data) {
        const response = this.http.post(URL, Data).map(res => res.json());
        return response;
    }
}
