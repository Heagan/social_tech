import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserFields } from '../models/api-models'
import { APIService } from '../api.service';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-profile-card',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

	user: Observable<UserFields>;

	constructor(private api: APIService) { }

	ngOnInit() {
		this.user = this.api.getUser();
	}

}
