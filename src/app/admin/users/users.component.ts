import { Component, OnInit, Injectable } from '@angular/core';
import { APIService } from '../../api.service';
import {
	DefaultReturn,
	UserFields
} from '../../models/api-models'
import { Observable, throwError } from 'rxjs';
import { GoalsComponent } from '../../goals/goals.component';
import { NoteReturnDetails, GoalInfoReturn, CompletedGoalInfoReturn } from '../../models/api-models';

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	users: UserFields[];
	notes: Observable<NoteReturnDetails[]>;

	searchBy = 'Name';
	selUser: UserFields;

	constructor(public api: APIService, public goalsComponent: GoalsComponent) { }

	ngOnInit() {
		this.api.getAllUsersFromDB().subscribe(
			res => {
				this.users = res.data;
			}
		);
	}

	groupUser() {
		if (this.selUser)
		switch (this.selUser.user_group_id) {
			case (0):
				return "Individual"
			case (1):
				return "Business"
			case (2):
				return "Administrator"
			default:
				return "Unknown"
		}
	}

	selectUser(i) {
		this.selUser = this.users[i];
		this.api.loginInfo.user_id = this.selUser.user_id;
		this.notes = this.api.getNotes();
		this.api.refreshGoals();
		this.api.getGoalsFromDB().subscribe(
			res => {
				this.api.goalsSource.next(<GoalInfoReturn[]>res.data);
				this.api.getCompletedGoalFromDB().subscribe(
					res => {
						this.api.completeGoalsSource.next(<CompletedGoalInfoReturn[]>res.data);
					},
					error => console.error(error),
					() => {
						this.goalsComponent.getCommitments();
					}
				);
			},
			error => console.error(error)
		);
	}

	log(log) {
		console.log(log);
	}

	search() {
		var input, filter, ul, li, a, i;

		input = document.getElementById("mySearch");
		filter = input.value.toUpperCase();
		ul = document.getElementById("myMenu");
		li = ul.getElementsByTagName("li");
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByTagName("a")[0];
			if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";

			} else {
				li[i].style.display = "none";
			}
		}
	}

}
