import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	//0 - indiv
	//1 - business
	//2 - admin

	public id: string;
	public userGroupId: number = 0;
	public error: string;

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			let date = params['token'];
			console.log(date); // Print the parameter to the console. 
		});
	}



}
