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

	message: boolean = false;

	constructor(public api: APIService, public router: Router, config: NgbProgressbarConfig) {
		// customize default values of progress bars used by this component tree
		config.max = 1000;
		config.striped = true;
		config.animated = true;
		config.type = 'success';
		config.height = '20px';
	}

	ngOnInit() {
	}

	addNote(note: string) {
		if (note.length < 5) {
			return;
		}
		console.log("Adding New note " + note);
		this.api.addNote(note).subscribe(
			res => {
				console.log(res.success);
				console.log(res.message);
				this.message = true;
				this.api.refreshNotes();
			},
			error => {
				console.error("There was an error while trying to add note?\n" + error);
			}
		);
	}

}
