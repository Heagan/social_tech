
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

export interface DefaultReturn {
	success: boolean;
	message: string;
	data: any[];
}



