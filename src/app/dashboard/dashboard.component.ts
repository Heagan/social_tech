import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserFields, MotivMessReturn } from '../models/api-models';
import { DetailsComponent } from './details/details.component';

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
	
	public page = 'home';
	public quote = false;
	public innerWidth: any;
	public innerHeight: any;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.innerWidth = window.innerWidth;
		this.innerHeight = window.innerHeight;
	}

	constructor(public api: APIService, public router: Router) {
	}

	ngOnInit() {
		this.user = this.api.getUser();
		this.motivMess = this.api.getMotivMess();
	}

	openPage(path: string) {
		this.quote = false;
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
