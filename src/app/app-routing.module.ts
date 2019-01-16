import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { GoalsComponent } from './goals/goals.component';
import { ProfileCardComponent } from "./profile-card/profile-card.component";
import { NotesComponent } from './notes/notes.component';
import { CheckInViewComponent } from './check-in-view/check-in-view.component';
import { LearnComponent } from './learn/learn.component';
import { SigninComponent } from './signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';

import { NeedAuthGuard } from './auth.guard';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'login', component: SigninComponent},
	{ path: 'signup', component: SignupComponent},
	{ path: 'notes', component: NotesComponent, canActivate: [NeedAuthGuard] },
	{ path: 'home', component: HomeComponent, canActivate: [NeedAuthGuard] },
	{ path: 'goals', component: GoalsComponent, canActivate: [NeedAuthGuard]  },
	{ path: 'profile', component: ProfileCardComponent, canActivate: [NeedAuthGuard] },
	{ path: 'checkin', component: CheckInViewComponent, canActivate: [NeedAuthGuard] },
	{ path: 'journal', component: JournalComponent, canActivate: [NeedAuthGuard] },
	{ path: 'learn', component: LearnComponent, canActivate: [NeedAuthGuard] },
	{ path: 'admin', component: AdminComponent, canActivate: [NeedAuthGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
