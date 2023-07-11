import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { UserService } from 'src/app/service/user.service';
import { VoteService } from 'src/app/service/vote.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  isLoading: boolean = false;

  candidates: any[] = [];

  chart: any = null;

  constructor(private readonly voteService: VoteService, private readonly route: ActivatedRoute, private readonly userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.getElectionDetail(params['id']);
      }
    });
  }
  
  instantiateChart(names: any[], votes: any[]) {
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: names,
        datasets: [{
          label: 'Votes',
          data: votes,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }

  getElectionDetail(electionId: any) {
    const requestBody = {
      data: {
        electionId: electionId,
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
          const dataName: any[] = [];
          const dataVote: any[] = [];
          let totalVotes: number = 0;
          this.candidates.forEach((x) => {
            totalVotes += Number(x.elections ? x.elections[0].votes : 0)
          });
          this.candidates.forEach((x) => {
            dataName.push(x.name + ' (in %)');
            const percent = Number((x.elections ? x.elections[0].votes : 0) / totalVotes * 100)
            dataVote.push(percent)
          });
          this.instantiateChart(dataName, dataVote);
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.candidates = [];
        this.isLoading = false;
      }
    });
  }
}
