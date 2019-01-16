import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserFields, MotivMessReturn, NotiReturn } from '../models/api-models';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Howl } from 'howler';

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

	showAchievement: boolean = false;

	public page = 'home';
	public quote = false;

	public exp: number = 7849;

	public innerWidth: any;
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.innerWidth = window.innerWidth;
	}

	sound = new Howl({
		src: ["../../assets/achive.wav"]
	});
	playAudio() {
		this.sound.play();
	}

	constructor(public api: APIService, public router: Router, expBar: NgbProgressbarConfig) {
		expBar.max = 1000;
		expBar.striped = true;
		expBar.animated = true;
		expBar.type = 'success';
		expBar.height = '20px';
	}

	allseen() {
		this.notiNum = 0;
		if (this.nofication)
			this.nofication.subscribe(
				res => {
					this.notiNum = 0;
					if (res)
						for (var n of res) {
							if (!n.seen)
								this.api.setNotiAsSeen(n.id);
						}
				}
			)
	}

	getNotiList() {
		var notis = new Array();

		if (this.nofication)
			this.nofication.subscribe(
				res => {
					if (res)
						for (var n of res) {
							if (n.seen) {
								notis.push(n);
							} else {
								notis.reverse();
								notis.push(n);
								notis.reverse();
							}
						}
				}
			)
		return notis;
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
					console.log("Experence points: " + this.exp);
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

	getLeftImage() {
		this.user = this.api.getUser();
		this.user.subscribe(
			res => {
				if (res) {
					this.exp = res.exp_points;
					var n = 1 + (this.exp - (this.exp % 1000) / 1000);
					return '../../assets/pictures/flower/' + n + '.png';
				}
			}
		);
	}

	getRightImage() {
		this.user = this.api.getUser();
		this.user.subscribe(
			res => {
				if (res) {
					this.exp = res.exp_points;
					var n = 2 + (this.exp - (this.exp % 1000) / 1000);
					n = n % 7;
					return '../../assets/pictures/flower/' + n + '.png';
				}
			}
		);
	}

}
