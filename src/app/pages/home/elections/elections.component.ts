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
  
  href = this.router.url;

  org: string = sessionStorage.getItem('role') || '';

  elections: any[] = [];

  displayElections: any[] = [];

  isLoading: boolean = true;

  todayDate = new Date().toISOString().slice(0, 10);

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
          this.mapElectionsData();
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.elections = [];
        this.isLoading = false;
      }
    });
  }

  mapElectionsData() {
    this.elections.forEach((x) => {
      const startDate = new Date(x.startDate);
      const endDate = new Date(x.EndDate);
      const todays = new Date(this.todayDate);
      if (startDate.getTime() <= todays.getTime() && endDate.getTime() >= todays.getTime()) {
        this.displayElections.push(x);
      }
    });
  }

  checkButtonText(): string {
    if (this.href.includes('result')) {
      return 'View';
    } else {
      if (this.org === 'committee') {
        return 'Detail';
      } else {
        return 'Participate';
      }
    }
  }

  navigateToDetail(electionId: any) {
    if (this.href.includes('result')) {
      this.router.navigateByUrl(`/result/${electionId}`);
    } else {
      if (this.org === 'committee') {
        this.router.navigateByUrl(`/election/${electionId}`);
      } else {
        this.router.navigateByUrl(`/votes/${electionId}`);
      }
    }
  }

}
