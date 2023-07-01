import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { VoteService } from 'src/app/service/vote.service';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
	fromDate: NgbDate | null = null;
	toDate: NgbDate | null = null;
	hoveredDate: NgbDate | null = null;

	eventForm: FormGroup = new FormGroup({
		electionId: new FormControl(uuid()),
		name: new FormControl('', [Validators.required]),
		startDate: new FormControl('', [Validators.required]),
		endDate: new FormControl('', [Validators.required]),
		username: new FormControl(sessionStorage.getItem('username')),
		org: new FormControl(sessionStorage.getItem('role'))
	});

	constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private readonly voteService: VoteService, private readonly router: Router) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

	ngOnInit(): void {
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

	onCreate() {
		const formValue = this.eventForm.value;
		const requestBody = {
			data: {
				electionId: formValue.electionId,
				name: formValue.name,
				startDate: this.formatter.format(this.fromDate),
				endDate: this.formatter.format(this.toDate),
				username: sessionStorage.getItem('username'),
				org: sessionStorage.getItem('role')
			},
			token: sessionStorage.getItem('token')
		}
		this.voteService.createElection(requestBody).subscribe({
			next: (res: any) => {
				const result = JSON.parse(res)
				if (result.status === 'Success!') {
					Swal.fire(
						result.status,
						`${result.description}`,
						'success'
					);
					this.router.navigateByUrl('/candidates');
				}
			},
			error: (err: any) => {
				Swal.fire(
					'Oops!',
					`${err.message}`,
					'error'
				);
			}
		});
	}
}
