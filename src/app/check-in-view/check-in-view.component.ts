import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-check-in-view',
	templateUrl: './check-in-view.component.html',
	styleUrls: ['./check-in-view.component.css']
})
export class CheckInViewComponent implements OnInit {

	public acdisplay = false;
	public disableSelect = true;

	showText() {
		this.disableSelect = !this.disableSelect;
		console.log(this.disableSelect);
		var x = document.getElementById("HiddableNote");
		if (this.disableSelect) {
		  x.style.display = "block";
		} else {
		  x.style.display = "none";
		}
	}

	constructor() { }

	ngOnInit() {
	}

}
