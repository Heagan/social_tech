import { Component, OnInit } from '@angular/core';
import { getComponent } from '@angular/core/src/linker/component_factory_resolver';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	mode = "";

	constructor() { }

	ngOnInit() { }

}
