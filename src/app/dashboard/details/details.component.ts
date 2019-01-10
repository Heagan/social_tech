import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserFields, MotivMessReturn } from '../../models/api-models';

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

	user: Observable<UserFields>;
	motivMess: Observable<MotivMessReturn>;
	
	public innerWidth = 0;
	public quote = false;
	public logout = false;
	
	constructor(public api: APIService) { }
	
	ngOnInit() {
		this.user = this.api.getUser();
		this.motivMess = this.api.getMotivMess();
	}

	newMessage() {
		this.api.refreshMotivMess();
	}

}
