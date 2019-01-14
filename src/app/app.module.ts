import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DpDatePickerModule} from 'ng2-date-picker';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoalsComponent } from './goals/goals.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { NotesComponent } from './notes/notes.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodaysActivityViewComponent } from './home/todays-activity-view/todays-activity-view.component';
import { CheckInViewComponent } from './check-in-view/check-in-view.component';
import { GraphComponent } from './home/graph/graph.component';
import { LearnComponent } from './learn/learn.component';
import { APIService } from './api.service';
import { NeedAuthGuard } from './auth.guard';
import { DetailsComponent } from './dashboard/details/details.component';
import { DashboardMobileComponent } from './dashboard-mobile/dashboard-mobile.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { QuotesComponent } from './admin/quotes/quotes.component';
import { LcentreComponent } from './admin/lcentre/lcentre.component';
import { GoalFormComponent } from './goals/goal-form/goal-form.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		DashboardComponent,
		GoalsComponent,
		ProfileCardComponent,
		LoginComponent,
		SignupComponent,
		SigninComponent,
		ProfileComponent,
		NotesComponent,
		TodaysActivityViewComponent,
		CheckInViewComponent,
		GraphComponent,
		LearnComponent,
		DetailsComponent,
		DashboardMobileComponent,
		AdminComponent,
		UsersComponent,
		QuotesComponent,
		LcentreComponent,
		GoalFormComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		AppMaterialModule,
		FormsModule,
		ReactiveFormsModule,
		ChartsModule,
		NgbModule,
		DpDatePickerModule,
	],
	entryComponents: [],
	providers: [NeedAuthGuard],
	bootstrap: [AppComponent]
})

export class AppModule { }
