import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

import { Goal } from './goals/goals.component';
import { Howl } from 'howler';

import {
	HttpClient,
	HttpErrorResponse,
	HttpResponse,
} from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
	DefaultReturn,
	GoalInfoReturn,
	LoginReturnDetails,
	NoteReturnDetails,
	UserFields,
	CompletedGoalInfoReturn,
	MotivMessReturn,
	CheckinReturn,
	SignUpDetails,
	SignUpReturn,
	NotiReturn
} from './models/api-models'

@Injectable({
	providedIn: 'root'
})
export class APIService {

	public messageSource = new BehaviorSubject('default message');
	currentMessage = this.messageSource.asObservable();

	changeMessage(message: string) {
		this.messageSource.next(message)
	}

	public notiUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/notifications/all/";
	public createNotiUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/notifications/create"; //user_id, notification, time_date
	public setNotiSeenUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/notifications/set_as_seen/" //:id

	public sendInviteLinkUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/admin/invite"
	public signUpUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/users/signup" // first_name, last_name, user_password, phone_number, v_token, email, user_group_id
	public signupVerifyUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/users/verify/";

	public checkinUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/checkins";
	public motivMessUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/motivational_r";

	public goalsCompletedUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/completed_commitments/";
	public goalsUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/commitments/";

	public notesUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/notes/";

	public usersUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/users/";

	public loginUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/login";
	public loginWithTokenUrl = "https://smile-coaching-platform-dev.herokuapp.com/api/token_login";

	public checkinSource = new BehaviorSubject(undefined);
	public checkin = <Observable<CheckinReturn>>this.checkinSource.asObservable();

	public motivMessSource = new BehaviorSubject(undefined);
	public motivMess = <Observable<MotivMessReturn>>this.motivMessSource.asObservable();

	public userSource = new BehaviorSubject(undefined);
	public user = <Observable<UserFields>>this.userSource.asObservable();

	public notesSource = new BehaviorSubject(undefined);
	public notes = <Observable<NoteReturnDetails[]>>this.notesSource.asObservable();

	public completeGoalsSource = new BehaviorSubject(undefined);
	public completeGoals = <Observable<CompletedGoalInfoReturn[]>>this.completeGoalsSource.asObservable();

	public goalsSource = new BehaviorSubject<GoalInfoReturn[]>(undefined);
	public goals = <Observable<GoalInfoReturn[]>>this.goalsSource.asObservable();

	public notiSource = new BehaviorSubject(undefined);
	public noti = <Observable<NotiReturn[]>>this.notiSource.asObservable();

	public goalsInfo: Goal[];

	public loginInfo: LoginReturnDetails;

	constructor(public http: HttpClient) { }

	// whys this here?
	// last minute decision
	sound = new Howl({
		src: ["../../assets/achive.wav"]
	});
	public playAudio() {
		this.sound.play();
	}


	public inviteUser(email: string, type: number) {
		return this.http.post<DefaultReturn>(this.sendInviteLinkUrl, {email: email, user_group_id: type});
	}

	public isLoggedIn(): boolean {
		if (this.loginInfo)
			if (this.loginInfo && localStorage.getItem('logged_in') == "true")
				return true;
		return false;
	}

	public isAdmin(): boolean {
		if (this.loginInfo)
			return this.loginInfo.admin;
		return false;
	}

	public signup(signupDetails: SignUpDetails) {
		console.log("Signup attempt");
		return this.http.post<DefaultReturn>(this.signUpUrl, signupDetails).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public verifySignupToken(token: string) {
		return this.http.get<DefaultReturn>(this.signupVerifyUrl + token).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public setNotiAsSeen(id: number) {
		if (!this.isLoggedIn())
			return undefined;
		console.log("SEEN!");
		this.http.put<DefaultReturn>(this.setNotiSeenUrl + id, '').pipe(
			retry(3),
			catchError(this.errorHandler)
		).subscribe(
			res => {
				console.log(res.success);
				console.log(res.message);
			}
		);
	}

	public addNotification(user_id: number, notification: string) {
		var date: string = formatDate(Date.now(), 'medium', 'en-US');
		console.log("Sending notification to user");
		return this.http.post<DefaultReturn>(this.createNotiUrl, {user_id: user_id, notification: notification, time_date: date});
	}

	public getAllUsersFromDB(): Observable<DefaultReturn> {
		if (!this.isLoggedIn())
			return undefined;
		console.log("Getting user info");
		return this.http.get<DefaultReturn>(this.usersUrl).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public getUserFromDB(): Observable<DefaultReturn> {
		if (!this.isLoggedIn())
			return undefined;
		console.log("Getting user info");
		return this.http.get<DefaultReturn>(this.usersUrl + this.loginInfo.user_id).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public getNotificationsFromDB(): Observable<DefaultReturn> {
		if (!this.isLoggedIn())
			return undefined;
		console.log("Getting notifications info");
		return this.http.get<DefaultReturn>(this.notiUrl + this.loginInfo.user_id).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public getNotesFromDB(): Observable<DefaultReturn> {
		if (!this.isLoggedIn())
			return undefined;
		console.log("Getting notes from db");
		return this.http.get<DefaultReturn>(this.notesUrl + this.loginInfo.user_id).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public getGoalsFromDB(): Observable<DefaultReturn> {
		if (!this.isLoggedIn())
			return undefined;
		console.log("Getting goals from db");
		return this.http.get<DefaultReturn>(this.goalsUrl + this.loginInfo.user_id).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public getMotivMessFromDB(): Observable<DefaultReturn> {
		if (!this.isLoggedIn())
			return undefined;
		console.log("Getting a motivational message from db");
		return this.http.get<DefaultReturn>(this.motivMessUrl).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public getCompletedGoalFromDB(): Observable<DefaultReturn> {
		if (!this.isLoggedIn())
			return undefined;
		console.log("Getting completed goals from db");
		return this.http.get<DefaultReturn>(this.goalsCompletedUrl).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public submitCheckinAnswers(answers: CheckinReturn): Observable<DefaultReturn> {
		if (!this.isLoggedIn())
			return undefined;
		answers.user_id = this.loginInfo.user_id;
		console.log("Submitting users answers");
		return this.http.post<DefaultReturn>(this.checkinUrl, answers).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}


	public addGoal(goal: GoalInfoReturn): Observable<DefaultReturn> {
		console.log("Adding Goal note ");
		goal.created_date = formatDate(Date.now(), 'medium', 'en-US');
		goal.created_by = this.loginInfo.user_id;
		goal.user_id =  this.loginInfo.user_id;
		return this.http.post<DefaultReturn>(this.goalsUrl, goal).pipe(
			retry(3),
			catchError(this.errorHandler)
		);

	}

	public addNote(note: string): Observable<DefaultReturn> {
		console.log("API Says: Adding New note " + note);
		var date: string = formatDate(Date.now(), 'medium', 'en-US');
		var user_id: number = this.loginInfo.user_id;
		console.log(date);
		
		return this.http.post<DefaultReturn>(this.notesUrl, { user_id: user_id, note: note, date_created: date }).pipe(
			retry(3),
			catchError(this.errorHandler)
		);

	}

	public editNote(note: string, note_id: number): Observable<DefaultReturn> {
		var date: string = formatDate(Date.now(), 'medium', 'en-US');

		console.log("API Says: Editing note " + note);
		return this.http.put<DefaultReturn>(this.notesUrl, { note: note, note_id: note_id, date_edited: date }).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public removeNote(note_id: number): Observable<DefaultReturn> {
		console.log("API Says: Removing note no. " + note_id);
		return this.http.delete<DefaultReturn>(this.notesUrl + note_id).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public refreshUser() {
		this.getUserFromDB().subscribe(res => this.userSource.next(res), error => console.error(error));
	}

	public refreshNotes() {
		this.getNotesFromDB().subscribe(res => this.notesSource.next(res), error => console.error(error));
	}

	public refreshNotification() {
		this.getNotificationsFromDB().subscribe(res => this.notiSource.next(res.data), error => console.error(error));
	}

	public refreshGoals() {
		this.getGoalsFromDB().subscribe(
			res => {
				this.goalsSource.next(<GoalInfoReturn[]>res.data);
				this.getCompletedGoalFromDB().subscribe(
					res => {
						console.log("Got the com goals");
						this.completeGoalsSource.next(<CompletedGoalInfoReturn[]>res.data);
					},
					error => console.error(error)
				);
			},
			error => console.error(error)
		);

	}

	public refreshMotivMess() {
		this.getMotivMessFromDB().subscribe(res => this.motivMessSource.next(res.data[0]), error => console.error(error));
	}

	public refreshEverything() {
		this.refreshUser();
		this.refreshGoals();
		this.refreshNotes();
		this.refreshMotivMess();
		this.refreshNotification();
	}

	public getMotivMess(): Observable<MotivMessReturn> {
		return this.motivMess;
	}

	public getNotification(): Observable<NotiReturn[]> {
		return this.noti;
	}

	public getUser(): Observable<UserFields> {
		return this.user;
	}

	public getNotes(): Observable<NoteReturnDetails[]> {
		this.refreshNotes();
		return this.notes;
	}

	public getGoals(): Observable<GoalInfoReturn[]> {
		return this.goals;
	}

	public getCommitmentsGoals(): Observable<CompletedGoalInfoReturn[]> {
		return this.completeGoals;
	}

	public login(email: string, user_password: string): Observable<DefaultReturn> {
		console.log("Login attempt: '" + email + "' '" + user_password + "'");

		return this.http.post<DefaultReturn>(this.loginUrl, { email: email, user_password: user_password }).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
	}

	public login_with_token(token: string): Observable<DefaultReturn> {
		console.log("Login attempt using stored token");

		return this.http.post<DefaultReturn>(this.loginWithTokenUrl, { token: token }).pipe(
			retry(3),
			catchError(this.errorHandler)
		);
		return undefined;
	}

	public errorHandler(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('A client-side or network error occurred:', error.error.message);
		} else {
			console.error(
				"The backend returned an unsuccessful response code.\n" +
				`Backend returned code ${error.status}, ` +
				`body was:`);
			console.error(error.error);
		}
		return throwError(error.error.message);
	};

}