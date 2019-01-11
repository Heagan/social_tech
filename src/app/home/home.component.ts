import { Component, OnInit, Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

import { APIService } from '../api.service';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	message: string;

	constructor(public api: APIService, public router: Router, config: NgbProgressbarConfig) {
		// customize default values of progress bars used by this component tree
		config.max = 1000;
		config.striped = true;
		config.animated = true;
		config.type = 'success';
		config.height = '20px';
	}

	ngOnInit() {
		this.api.currentMessage.subscribe(message => this.message = message);
	}

	newMessage() {
		console.log("HELLO!");
		this.api.changeMessage("Hello from Sibling")
	}

	day = formatDate(Date(), "MMM d, y", "en-US");
	time = formatDate(Date(), "h:mm:ss", "en-US");
	da(ada) {
		console.log(this.day + " at " + this.time);
	}

}
