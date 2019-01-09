import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';

import { Note } from '../models/note';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { APIService } from '../api.service';
import { NoteReturnDetails } from '../models/api-models';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';

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
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {

	displayAddNewNoteForm: boolean = false;
	noteMinLengthFormControl = new FormControl('', Validators.minLength(5) );

	matcher = new MyErrorStateMatcher();

	notes: Observable<NoteReturnDetails[]>;

	constructor(private api: APIService) {
		
	}

	ngOnInit() {
		this.getNotes();
	}

	addNote(note: string) {
		if (note.length < 5) {
			return;
		}
		console.log("Adding New note " + note);
		this.api.addNote(note).subscribe(
			res => {
				console.log(res.success);
				console.log(res.data);
				console.log(res.message);
				if (res.success)
					this.getNotes();
			},
			error => {
				console.error("There was an error while trying to add note?\n" + error);
			}
		);
	}

	removeNote(note_id: number) {
		console.log("Note no. " + note_id + " will be removed!");
		this.api.removeNote(note_id).subscribe(
			res => {
				console.log(res.success);
				console.log(res.data);
				console.log(res.message);
				if (res.success)
					this.getNotes();
			},
			error => {
				console.error("There was an error while trying to remove note?\n" + error);
			}
		);
	}

	editNote(note: string, note_id: number) {
		console.log("Editing Note no. " + note_id);
		this.api.editNote(note, note_id).subscribe(
			res => {
				console.log(res.success);
				console.log(res.data);
				console.log(res.message);
				if (res.success)
					this.getNotes();
			},
			error => {
				console.error("There was an error while trying to edit note?\n" + error);
			}
		);
	}

	getNotes() {
		this.notes = this.api.getNotes();
	}
}
