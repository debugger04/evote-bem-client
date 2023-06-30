import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VoteService } from 'src/app/service/vote.service';

@Component({
  selector: 'app-election-detail',
  templateUrl: './election-detail.component.html',
  styleUrls: ['./election-detail.component.css']
})
export class ElectionDetailComponent implements OnInit {

  eventForm: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
		startDate: new FormControl('', [Validators.required]),
		endDate: new FormControl('', [Validators.required])
	});

  electionDetail: any = {
    name: 'aa',
    startDate: '123-123-123',
    endDate: '123-123-123'
  };
  
  isLoading: boolean = false;

  constructor(private readonly voteService: VoteService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.params.subscribe({
    //   next: (params) => {
    //     console.log(params['id']);
    //   }
    // });
    this.setValueToForm(this.electionDetail);
  }

  setValueToForm(detail: any) {
    this.eventForm.controls['name'].disable();
    this.eventForm.controls['startDate'].disable();
    this.eventForm.controls['endDate'].disable();
    this.eventForm.controls['name']?.setValue(detail.name);
    this.eventForm.controls['startDate']?.setValue(detail.startDate);
    this.eventForm.controls['endDate']?.setValue(detail.endDate);
  }

}
