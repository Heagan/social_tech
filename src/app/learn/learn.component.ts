import { Component, OnInit } from '@angular/core';
import { LEARN_CARDS } from './mock-learn'
import { LearnCard } from '../models/learn';

@Component({
	selector: 'app-learn',
	templateUrl: './learn.component.html',
	styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

	learnCards: Array<LearnCard> = LEARN_CARDS;

	constructor() { }

	ngOnInit() {
	}

}
