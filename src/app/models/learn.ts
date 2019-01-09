export class LearnCard {
	id: number;
	title: String = '';
	note: String = '';
	url: String = '';
	picUrl: String = '';

	constructor(learnCard: LearnCard) {
		this.id = learnCard.id;
		this.title = learnCard.title;
		this.note = learnCard.note;
		this.url = learnCard.url;
		this.picUrl = learnCard.picUrl;
	}
};