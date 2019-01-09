export class Note {
	id: number;
	note: String = '';

	constructor(note: Note) {
		this.id = note.id;
		this.note = note.note;
	}
};