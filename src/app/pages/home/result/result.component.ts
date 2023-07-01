import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { VoteService } from 'src/app/service/vote.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  isLoading: boolean = true;

  candidates: any[] = [];

  chart: any = null;

  constructor(private readonly voteService: VoteService, private readonly route: ActivatedRoute) { }

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
        username: sessionStorage.getItem('username'),
        org: sessionStorage.getItem('role')
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
          this.candidates.forEach((x) => {
            dataName.push(x.name);
            dataVote.push(x.elections[0].votes);
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
