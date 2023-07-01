import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoteService } from 'src/app/service/vote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {

  actionButton: string = sessionStorage.getItem('role') || '';

  elections: any[] = [];

  isLoading: boolean = true;

  constructor(private readonly voteService: VoteService, private router: Router) { }

  ngOnInit(): void {
    this.getAllElectionData();
  }

  getAllElectionData() {
    const requestBody = {
      data: {
        username: sessionStorage.getItem('username'),
        org: sessionStorage.getItem('role')
      },
      token: sessionStorage.getItem('token')
    }
    this.voteService.getAllElection(requestBody).subscribe({
      next: (res: any) => {
        const result = JSON.parse(res)
        if (result.status === 'SUCCESS') {
          this.elections = JSON.parse(result.objectBytes);
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.elections = [];
        this.isLoading = false;
      }
    });
  }

  navigateToDetail(electionId: any) {
    const org = sessionStorage.getItem('role');
    if (org === 'committee') {
      this.router.navigateByUrl(`/election/${electionId}`);
    } else {
      this.router.navigateByUrl(`/votes/${electionId}`);
    }
  }

}
