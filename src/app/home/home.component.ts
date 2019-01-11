import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

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

}
