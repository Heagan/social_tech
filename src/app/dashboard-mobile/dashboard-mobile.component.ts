import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserFields, MotivMessReturn } from '../models/api-models';

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-dashboard-mobile',
	templateUrl: './dashboard-mobile.component.html',
	styleUrls: ['./dashboard-mobile.component.css']
})
export class DashboardMobileComponent implements OnInit {

	user: Observable<UserFields>;
	motivMess: Observable<MotivMessReturn>;

	public innerWidth: any;
	public innerHeight: any;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.innerWidth = window.innerWidth;
		this.innerHeight = window.innerHeight;
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

}
