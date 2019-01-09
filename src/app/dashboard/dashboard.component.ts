import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserFields, MotivMessReturn } from '../models/api-models';
import { NgClass } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	user: Observable<UserFields>;
	motivMess: Observable<MotivMessReturn>;
	message: string;

	public innerWidth: any;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.innerWidth = window.innerWidth;
	}

	page = 'home';
	constructor(public api: APIService, public router: Router) {
	}

	ngOnInit() {
		this.user = this.api.getUser();
		this.motivMess = this.api.getMotivMess();
	}

	openPage(path: string) {
		localStorage.setItem('cur_page', path);
		this.router.navigateByUrl(path);
	}

	logout() {
		localStorage.setItem('logged_in', 'false');
	}

	newMessage() {
		this.api.refreshMotivMess();
	}

}
