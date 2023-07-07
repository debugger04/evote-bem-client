import { Injectable } from '@angular/core';
import { baseUrl } from "./util/mailhelper.util";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private readonly http: HttpClient) { }

  sendMail(data: any): Observable<any> {
    return this.http.post(baseUrl+'sendmail', data, {responseType: 'text'});
  }
}
