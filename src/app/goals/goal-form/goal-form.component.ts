import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'app-goal-form',
	templateUrl: './goal-form.component.html',
	styleUrls: ['./goal-form.component.css']
})
export class GoalFormComponent implements OnInit {

	error: string;
	public innerWidth: any;
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.innerWidth = window.innerWidth;
	}

	constructor() { }

	ngOnInit() {
	}

}
