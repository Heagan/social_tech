import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignUpDetails, SignUpReturn } from '../models/api-models';
import { APIService } from '../api.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	//0 - indiv
	//1 - business
	//2 - admin

	name: string;
	surname: string;
	phone: string;
	pswd: string;
	pswd2: string;

	public token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3IiOiJqdWdhbmF1Z2h0NzJAZ21haWwuY29tIiwiZ3JwIjoiMSIsImlhdCI6MTU0NzIyMTY4N30.UkEoqozu-dFToMoIJnzyk7olA-o5uP2vo5K8MsN_wGk";
	public error: string = "Not enough information!";

	public signupDetail: SignUpDetails = new SignUpDetails;
	public signUpReturn: SignUpReturn;

	constructor(public api: APIService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.token = params['token'];
			console.log(this.token);
			this.api.verifySignupToken(this.token).subscribe(
				res => {
					this.signUpReturn = <SignUpReturn><unknown>res.data;
					console.log(res.success);
					console.log(res.message);
				}
			);
		});
	}

	passmatch(): boolean {
		
		if (!this.pswd || !this.pswd2) {
			return true;
		}
		if (this.pswd != this.pswd2) {
			this.error = "Passwords dont match!";
		}
		return (this.pswd == this.pswd2);
	}

	valiLength(text: string, min: number): boolean {
		if (!text) {
			this.error = "Not enough information!";
			return false;
		}
		if (text.length < min) {
			this.error = "Not enough information!";
		}
		return (text.length >= min);
	}


	isValid(): boolean {
		var valid: boolean = false;

		if (this.passmatch())
		if (this.valiLength(this.phone, 10))
		if (this.valiLength(this.pswd, 8))
		if (this.valiLength(this.pswd2, 8))
		if (this.valiLength(this.name, 2)) {
			valid = true;
		} else {
			valid = false;
		}
		
		
		if (valid) {
			this.error = undefined;
		}
		return valid;
	}

	signup() {
		console.log("SIGN UP!");

		this.signupDetail.first_name = this.name;
		this.signupDetail.last_name = this.surname;
		this.signupDetail.user_password = this.pswd;
		this.signupDetail.phone_number = this.phone;
		this.signupDetail.email = this.signUpReturn.email;
		this.signupDetail.v_token = this.token;
		this.signupDetail.user_group_id = Number(this.signUpReturn.user_group_id);
		this.api.signup(this.signupDetail).subscribe(
			res => {
				console.log(res.success);
				console.log(res.message);
			}
		);
	}


}
