import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { APIService } from '../api.service';

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

	constructor(public api: APIService, public router: Router) { }

	ngOnInit() {
		this.api.currentMessage.subscribe(message => this.message = message);
	}

	newMessage() {
		console.log("HELLO!");
		this.api.changeMessage("Hello from Sibling")
	}

}
