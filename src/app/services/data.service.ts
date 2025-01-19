import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  httpClient = inject(HttpClient);
  constructor() {}
  baseurl = 'https://codingexercise.speakcore.com/api/registrations';

  getData(key: string, registrationId: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('key', key);
    let url = this.baseurl + '/' + registrationId;
    
    return this.httpClient.get(url);
  }

  postData(key: string, contact: Contact) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('key', key);

    return this.httpClient.post(this.baseurl, contact);
  }
}
