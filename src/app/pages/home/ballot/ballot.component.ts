import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { VoteService } from 'src/app/service/vote.service';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {

  isLoading: boolean = true;

  electionId: string = '';
  candidateId: string = '';

  ballots: any[] = [];

  constructor(private readonly route: ActivatedRoute, private readonly voteService: VoteService, private readonly userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: any) => {
        const joinId = params['joint_id'];
        const splitted = joinId.split('&');
        this.candidateId = splitted[0];
        this.electionId = splitted[1];

        this.getBallotData();
      }
    });
  }

  getBallotData() {
    const requestBody = {
      data: {
        electionId: this.electionId,
        candidateId: this.candidateId,
        username: this.userService.getUsername(),
        org: this.userService.getRole()
      },
      token: sessionStorage.getItem('token')
    }
    console.log(requestBody);
    this.voteService.getBallot(requestBody).subscribe({
      next: (res: any) => {
        const result = JSON.parse(res)
        if (result.status === 'SUCCESS') {
          this.ballots = JSON.parse(result.objectBytes);
          this.isLoading = false;
        }
      },
      error: () => {
        this.ballots = [];
        this.isLoading = false;
      },
    })
  }
}
