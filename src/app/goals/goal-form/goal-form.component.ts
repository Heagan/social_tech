import { Component, OnInit, HostListener, Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../api.service';
import { GoalInfoReturn } from '../../models/api-models';
import { Goal } from '../goals.component';

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-goal-form',
	templateUrl: './goal-form.component.html',
	styleUrls: ['./goal-form.component.css']
})
export class GoalFormComponent implements OnInit {

	parent: string = "";
	error: string;

	public date;
	public date1;
	public date2;
	public date3;



	public innerWidth: any;
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.innerWidth = window.innerWidth;
	}

	constructor(public api: APIService) { }

	ngOnInit() {
	}

	public goal_create: GoalInfoReturn = new GoalInfoReturn;

	getNum(s: string) {
		return Number(s);
	}

	getNull() {
		return undefined;
	}

	addGoal() {
		parseInt(this.parent);
		console.log(this.goal_create);

		this.api.addGoal(this.goal_create).subscribe(
			res => {
				console.log(res.success);
				console.log(res.message);
			}
		);
	}
	
	getGoals(): Goal[] {
		var goal: Goal[] = new Array;

		for (let goals of this.api.goalsInfo) {
			if (!(goals.info.parent_goal_id)) {
				goal.push(goals);
			}
		}

		return goal;
	}

	calcDate(date: string): string {
		if (!date)
			return "";
		var slt = date.split("-");

		return slt[2] + '-' + slt[1] + '-' + slt[0];
	}

	log(s) {
		console.log(s);
	}

}



