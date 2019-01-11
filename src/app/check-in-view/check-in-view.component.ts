import { Component, OnInit, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { CheckinReturn } from '../models/api-models';
import { Injectable } from '@angular/core';
import { APIService } from '../api.service';

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-check-in-view',
	templateUrl: './check-in-view.component.html',
	styleUrls: ['./check-in-view.component.css']
})
export class CheckInViewComponent implements OnInit {

	public acdisplay = false;
	public disableSelect = true;

	public answers: CheckinReturn = new CheckinReturn;

	constructor(public api: APIService) { }

	ngOnInit() {
		this.answers.q3 = "Joy";
	}

	dis() {
		for (var a in this.answers) {
			console.log(a + " = " + this.answers[a]);
		}
	}

	submit() {
		this.answers.date_answered = formatDate(Date(), "MMM d, y", "en-US");
		this.answers.time_answered = formatDate(Date(), "h:mm:ss", "en-US");
		this.api.submitCheckinAnswers(this.answers).subscribe(
			res => {
				console.log("Done! " + res);
			},
			error => {
				console.error(error);
			}
		);
	}

}
