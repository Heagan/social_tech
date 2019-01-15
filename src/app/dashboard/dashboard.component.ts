import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserFields, MotivMessReturn, NotiReturn } from '../models/api-models';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

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
	nofication: Observable<NotiReturn[]>;
	notiNum: number = 0;

	public page = 'home';
	public quote = false;

	public exp: number = 7849;

	public innerWidth: any;
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.innerWidth = window.innerWidth;
	}

	constructor(public api: APIService, public router: Router, expBar: NgbProgressbarConfig) {
		expBar.max = 1000;
		expBar.striped = true;
		expBar.animated = true;
		expBar.type = 'success';
		expBar.height = '20px';
	}

	getNotiCount() {
		if (this.nofication)
			this.nofication.subscribe(
				res => {
					this.notiNum = 0;
					if (res)
						for (var n of res) {
							if (!n.seen)
								this.notiNum++;
						}
				}
			)
		return this.notiNum;
	}

	ngOnInit() {
		this.nofication = this.api.getNotification();
		this.innerWidth = window.innerWidth;
		this.user = this.api.getUser();
		this.motivMess = this.api.getMotivMess();
		this.user.subscribe(
			res => {
				if (res) {
					this.exp = res.exp_points;
					console.log("Ex: " + this.exp);
				}
			}
		);
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
