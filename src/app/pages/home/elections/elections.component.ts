import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { VoteService } from 'src/app/service/vote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {
  
  href = this.router.url;

  org: string = this.userService.getRole() || '';

  elections: any[] = [];

  displayElections: any[] = [];

  isLoading: boolean = true;

  todayDate = new Date().toISOString().slice(0, 10);

  constructor(private readonly voteService: VoteService, private router: Router, private readonly userService: UserService) { }

  ngOnInit(): void {
    this.getAllElectionData();
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
    if (this.org !== 'voter') {
      this.displayElections = this.elections
    } else {
      this.elections.forEach((x) => {
        const startDate = new Date(x.startDate);
        const endDate = new Date(x.EndDate);
        const todays = new Date(this.todayDate);
        if (startDate <= todays && endDate >= todays) {
          this.displayElections.push(x);
        }
      });
    }
  }

  checkButtonText(): string {
    if (this.href.includes('result')) {
      return 'View';
    } else {
      if (this.org !== 'voter') {
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
      if (this.org !== 'voter') {
        this.router.navigateByUrl(`/election/${electionId}`);
      } else {
        this.router.navigateByUrl(`/votes/${electionId}`);
      }
    }
  }

}
