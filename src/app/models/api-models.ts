
export interface UserFields {
	first_name: string;
	last_name: string;
	phone_number: string;
	email: string;
	user_id: number;
	user_password: string;
	verified: boolean;
	user_group_id: number;
	v_token: string;
	u_token: string;
	exp_points: number;
	active: boolean;
}

export interface LoginReturnDetails {
	email: string;
	user_password: string;
	user_id: number;
	v_token: number;
	admin: boolean;
}

export interface NoteReturnDetails {
	user_id: number;
	note_id: number;
	note: string;
	date_created: string;
	date_edited: string;
	is_edited: boolean;
	editing: boolean;
}

export interface CompletedGoalInfoReturn {
	goal_id: number;
	date_completed: string;
	note: string;
	satisfaction: number;
}

export interface GoalInfoReturn {
	goal_id: number;
	goal_title: string;
	goal_description: string;
	start_date: string;
	end_date: string;
	start_time: string;
	end_time: string;
	is_full_day: boolean;
	is_recurring: boolean;
	user_id: number;
	created_by: number;
	created_date: string;
	parent_goal_id: number;
}
export interface MotivMessReturn {
	id: number;
	description: string;
	tags: string;
}

export class CheckinReturn {
	checkin_id: number = 0;
	user_id: number = 0;
	date_answered: string = "0";
	time_answered: string = "0";
	q1: string = "0";
	q2: string = "0";
	q3: string = "0";
	q4: string = "0";
	q5: string = "0";
	q6: string = "0";
	q7: string = "0";
	q8: string = "0";
	q9: string = "0";
	q10: string = "0";
	q11: string = "0";
	q12: string = "0";
	q13: string = "0";
	q14: string = "0";
	q15: string = "0";
	q16: string = "0";
	q17: string = "0";
	q18: string = "0";
	q19: string = "0";
	q20: string = "0";
	q21: string = "0";
	q22: string = "0";
	q23: string = "0";
	q24: string = "0";
	q25: string = "0";
	q26: string = "0";
	q27: string = "0";
	q28: string = "0";
	q29: string = "0";
	q30: string = "0";
	q31: string = "0";
	q32: string = "0";
	q33: string = "0";
	q34: string = "0";
}

export interface DefaultReturn {
	success: boolean;
	message: string;
	data: any[];
}
