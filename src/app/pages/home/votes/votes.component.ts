import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { VoteService } from 'src/app/service/vote.service';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent implements OnInit {

  electionDetail: any = {
    name: '',
    startDate: '',
    endDate: ''
  };

  elections: any[] = [];

  candidates: any[] = [];

  currentElectionId: string = '';

  isLoading: boolean = true;

  constructor(private readonly route: ActivatedRoute, private readonly voteService: VoteService, private router: Router, private readonly userService: UserService) { }

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
          this.getElectionDetail();
        }
      },
      error: (err: any) => {
        this.elections = [];
      }
    });
  }

  getElectionDetail() {
    this.route.params.subscribe({
      next: (params) => {
        this.currentElectionId = params['id'];
        this.elections.forEach((x) => {
          if (x.electionId == params['id']) {
            this.electionDetail = x;
          }
        });
        const requestBody = {
          data: {
            electionId: this.currentElectionId,
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

  onVoteClicked(_candidateId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will use your voice and you can only use it once!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I will vote!'
    }).then((result) => {
      if (result.isConfirmed) {
        const user = this.userService.getUsername();
        const requestBody = {
          data: {
            electionId: this.currentElectionId,
            userId: user,
            candidateId: _candidateId,
            username: user,
            org: this.userService.getRole()
          },
          ballot: {
            ballotId: uuid(),
            electionId: this.currentElectionId,
            voterId: user,
            candidateId: _candidateId,
            createdAt: new Date()
          },
          token: sessionStorage.getItem('token')
        }
        this.voteService.castVote(requestBody).subscribe({
          next: (res: any) => {
            const result = JSON.parse(res);{
              if (result.status === 'Success!') {
                Swal.fire(
                  'Success!',
                  'Your voice has been heard!',
                  'success'
                );
                this.router.navigateByUrl('');
              } else {
                Swal.fire(
                  'Hold on!',
                  'You can only vote once!',
                  'error'
                );
                this.router.navigateByUrl('');
              }
            }
          },
          error: (err: any) => {
            Swal.fire(
              'Oops!',
              err.message,
              'error'
            );
          }
        });
      }
    });
  }

}
