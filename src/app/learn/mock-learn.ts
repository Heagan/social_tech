import { Note } from '../models/note';
import { LearnCard } from '../models/learn';

export var LEARN_CARDS = [
	new LearnCard({
		id: 0,
		title: "Video Games Are a Waste of Time? Not for Those With E-sports Scholarships",
		note: "‘The games that are competitively viable in the collegiate sphere have real depth, have deep levels of strategy, and require strategic teamwork.’",
		url: "https://www.nytimes.com/2018/11/02/education/learning/video-games-esports-scholarships.html?rref=collection%2Fsectioncollection%2Feducation-learning",
		picUrl: "https://static01.nyt.com/images/2018/11/04/learning/04esports1/04esports1-videoLarge-v2.jpg"
	}),
	new LearnCard({
		id: 1,
		title: "More Colleges Are Playing the Long Game",
		note: "Finding ways to get students to connect early with career services support has become a goal at many colleges and universities around the country.",
		url: "https://www.nytimes.com/2018/11/02/education/learning/colleges-universities-career-services.html?rref=collection%2Fsectioncollection%2Feducation-learning",
		picUrl: "https://static01.nyt.com/images/2018/11/04/learning/04careers1/04careers1-videoLarge.jpg"
	}),
	new LearnCard({
		id: 2,
		title: "Programmed for Success",
		note: "Community colleges are relying more and more on technology to help their students succeed.",
		url: "https://www.nytimes.com/2018/11/02/education/learning/programmed-for-success.html?rref=collection%2Fsectioncollection%2Feducation-learning",
		picUrl: "https://static01.nyt.com/images/2018/11/04/autossell/04apps1/merlin_145494774_8ef02aa0-0077-49af-9a43-733a1ae7716d-videoLarge.jpg"
	}),
	new LearnCard({
		id: 3,
		title: "We need balance",
		note: "Tips on how to balance the important parts in your life!",
		url: "https://drive.google.com/file/d/1d9lN6bUnmpvLgujUWIfa5G89s1kFoHW7/view",
		picUrl: "./assets/learning/balance.png"
	}),
]
