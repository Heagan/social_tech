import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DefaultReturn, LoginReturnDetails } from '../models/api-models';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['signin.component.css', 'main.css', 'util.css']
})
export class SigninComponent implements OnInit {

	error: string;
	loading: boolean = false;

	constructor(private api: APIService, private router: Router) {
	}

	ngOnInit() {
		if (localStorage.getItem('remember_me') == 'true' && localStorage.getItem('logged_in') == "true" && localStorage.getItem('token')) {
			this.login_with_token(localStorage.getItem('token'));
		} else {
			this.loading = false;
		}
	}

	private tryLogin(login: Observable<DefaultReturn>) {
		console.log("Logging in");
		this.loading = true;
		login.subscribe(
			res => {
				console.log("Logged " + res.data);
				this.api.loginInfo = <LoginReturnDetails><unknown>res.data;
				this.error = res.message;
			},
			error => {
				this.error = error;
				this.loading = false;
			},
			() => {
				console.log("Logged " + this.api.loginInfo);
				if (this.api.loginInfo) {
					localStorage.setItem('logged_in', 'true');
					localStorage.setItem('token', this.api.loginInfo.v_token.toString());
					this.api.refreshEverything();
					this.router.navigateByUrl('/home');
				}
				this.loading = false;
			}
		);
	}

	public login(email: string, password: string, remember_me: boolean) {
		localStorage.setItem('remember_me', remember_me.toString());
		this.tryLogin(this.api.login(email, password));
	}

	public login_with_token(token: string) {
		this.tryLogin(this.api.login_with_token(token));
	}

}

// for(var property in this.log.data) {
// 	console.log("LOGIN LOG "+ property + " " + this.log.data[property]);
// }