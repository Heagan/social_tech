import { Component, OnInit, Injectable } from '@angular/core';

import { NgClass } from '@angular/common';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { APIService } from '../api.service';
import { GoalInfoReturn, CompletedGoalInfoReturn } from '../models/api-models';
import { Observable } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-goals',
	templateUrl: './goals.component.html',
	styleUrls: ['./goals.component.css']
})

export class GoalsComponent implements OnInit {


	displayAddNewGoalForm: boolean = false;
	newGoalTitle = new FormControl('', [Validators.minLength(5), Validators.required]);
	newGoalItem = new FormControl('', [Validators.minLength(5), Validators.required]);
	matcher = new MyErrorStateMatcher();

	goals: Goal[] = new Array();

	constructor(private api: APIService) { }

	ngOnInit() {
		this.getCommitments();
	}

	addGoal() {
		//this.goals.push(new Goal(this.newGoalTitle.value, [this.newGoalItem.value]));
	}

	getCommitments() {
		var goalInfo: GoalInfoReturn[];
		var comGoalInfo: CompletedGoalInfoReturn[];

		this.api.getGoals().subscribe(res => {
			goalInfo = res;
			this.api.getCommitmentsGoals().subscribe(
				res => {
					comGoalInfo = res;
					for (var info of goalInfo) {
						var comArray = new Array();
						for (var com of comGoalInfo) {
							if (com.goal_id == info.goal_id) {
								comArray.push(com);
							}
						}
						this.goals.push(new Goal(info, comArray));
					}
				}
			)
		});
	}

	getComFromId(id: number): Goal[] {
		var comms: Goal[] = new Array();

		for (var idx in this.goals) {
			var comm = this.goals[idx];
			if (comm.goal.parent_goal_id == id) {
				comms.push(comm);
			}
		}
		return comms;
	}

}

export class Goal {

	constructor(public goal: GoalInfoReturn, public complete: CompletedGoalInfoReturn[]) {	 };

	public collapse: boolean = false;

}
