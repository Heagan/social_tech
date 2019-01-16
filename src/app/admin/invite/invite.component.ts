import { Component, OnInit, Injectable } from '@angular/core';
import { APIService } from '../../api.service';

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-invite',
	templateUrl: './invite.component.html',
	styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

	sent: boolean = false;

	constructor(public api: APIService) { }

	ngOnInit() {
	}

	invite(email: string, type: number) {
		this.api.inviteUser(email, type).subscribe(
			res => {
				console.log(res.success);
				console.log(res.message);
			}
		);
	}

}
