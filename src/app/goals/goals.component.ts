import { Component, OnInit, Injectable, HostListener } from '@angular/core';

import { NgClass } from '@angular/common';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { GoalInfoReturn, CompletedGoalInfoReturn } from '../models/api-models';
import { Observable } from 'rxjs';
import { APIService } from '../api.service';

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

	goals: Goal[] = new Array();

	public innerWidth: any;
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.innerWidth = window.innerWidth;
	}

	constructor(public api: APIService) { }

	ngOnInit() {
		this.getCommitments();
	}

	setUpGoalChildren() {
		console.log("setUpGoalChildren");

		for (var goal of this.goals) {
			goal.children = this.getComFromId(goal.info.goal_id);
		}
	}

	getCommitments() {
		console.log("getCommitments");

		var goalInfo: GoalInfoReturn[];
		var comGoalInfo: CompletedGoalInfoReturn[];
		this.goals = new Array;

		this.api.getGoals().subscribe(res => {
			if (!res) {
				return;
			}
			goalInfo = res;
			this.api.getCommitmentsGoals().subscribe(
				res => {
					//get completed goals info
					comGoalInfo = res;
					//for each goal
					for (var info of goalInfo) {
						//empty array
						var comArray = new Array();

						//for each goal detail
						if (comGoalInfo)
							for (var com of comGoalInfo) {
								// if goal detail belongs to goal
								if (com.goal_id == info.goal_id) {
									//add to array
									comArray.push(com);
								}
							}
						//make a goal class with the goal, and its detail goals
						this.goals.push(new Goal(info, comArray));
					}
					this.setUpGoalChildren();
				}
			)
		});
		this.api.goalsInfo = new Array;
		this.api.goalsInfo = this.goals;
	}

	getComFromId(id: number): Goal[] {
		console.log("getComFromId");

		var comms: Goal[] = new Array();

		for (var idx in this.goals) {
			var comm = this.goals[idx];
			if (comm.info.parent_goal_id)
				if (comm.info.parent_goal_id == id) {
					comms.push(comm);
				}
		}
		return comms;
	}

}

export class Goal {

	constructor(public info: GoalInfoReturn, public progress: CompletedGoalInfoReturn[]) { };

	public collapse: boolean = false;
	public children: Goal[] = new Array();
}
