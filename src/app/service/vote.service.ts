import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from "./util/helper.util";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  getAllElection(data: any) {
    return this.http.post(baseUrl+'admin/election', data, {responseType: 'text'});
  }

  getElectionDetail(data: any) {
    return this.http.post(baseUrl+'admin/election', data, {responseType: 'text'});
  }

  createElection(data: any) {
    return this.http.post(baseUrl+'admin/election/create', data, {responseType: 'text'});
  }

  createCandidate(data: any) {
    return this.http.post(baseUrl+'admin/candidate/create', data, {responseType: 'text'});
  }
  
}
