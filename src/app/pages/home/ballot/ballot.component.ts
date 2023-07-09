import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  displayBallot: any[] = [];

  constructor(private readonly route: ActivatedRoute, private readonly voteService:VoteService) { }

  ngOnInit(): void {
    this.getSplitJoinId();
  }

  getSplitJoinId() {
    this.route.params.subscribe({
      next: (params: any) => {
        const joinId = params['joint_id'];
        const splitted = joinId.split('&');
        this.candidateId = splitted[0];
        this.electionId = splitted[1];
      }
    });
  }

}
