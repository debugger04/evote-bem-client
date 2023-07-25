import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { VoteService } from 'src/app/service/vote.service';

@Component({
  selector: 'app-election-detail',
  templateUrl: './election-detail.component.html',
  styleUrls: ['./election-detail.component.css']
})
export class ElectionDetailComponent implements OnInit {

  electionId: string = '';

  eventForm: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
		startDate: new FormControl('', [Validators.required]),
		endDate: new FormControl('', [Validators.required])
	});

  electionDetail: any = {
    name: '',
    startDate: '',
    endDate: ''
  };

  elections: any[] = [];

  candidates: any[] = [];
  
  isLoading: boolean = true;

  constructor(private readonly voteService: VoteService, private readonly route: ActivatedRoute, private readonly router: Router, private readonly userService: UserService) { }

  ngOnInit(): void {
    this.getAllElectionData();
  }

  getCurrentRole() {
    return this.userService.getRole();
  }

  getAllElectionData() {
    const requestBody = {
      data: {
        username: this.userService.getUsername(),
        org: this.userService.getRole()
      },
      token: sessionStorage.getItem('token')
    }
    this.voteService.getAllElection(requestBody).subscribe({
      next: (res: any) => {
        const result = JSON.parse(res)
        if (result.status === 'SUCCESS') {
          this.elections = JSON.parse(result.objectBytes);
          this.getElectionDetail();
        }
      },
      error: (err: any) => {
        this.elections = [];
      }
    });
  }

  onNavigateToBallot(candidateId: any) {
    this.router.navigateByUrl(`/ballot/${candidateId}&${this.electionId}`);
  }

  getElectionDetail() {
    this.route.params.subscribe({
      next: (params) => {
        this.electionId = params['id'];
        this.elections.forEach((x) => {
          if (x.electionId == params['id']) {
            this.electionDetail = x;
          }
        });
        const requestBody = {
          data: {
            electionId: params['id'],
            username: this.userService.getUsername(),
            org: this.userService.getRole()
          },
          token: sessionStorage.getItem('token')
        }
        this.voteService.getElectionDetail(requestBody).subscribe({
          next: (res: any) => {
            const result = JSON.parse(res)
            if (result.status === 'SUCCESS') {
              this.candidates =  JSON.parse(result.objectBytes);
              this.isLoading = false;
            }
          },
          error: (err: any) => {
            this.candidates = [];
            this.isLoading = false;
          }
        });
      }
    });
  }

}
