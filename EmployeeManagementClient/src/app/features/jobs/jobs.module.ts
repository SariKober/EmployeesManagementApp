import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon'; // וודא שאתה מייבא זאת
import {MatTableModule} from '@angular/material/table'; // הוסף את זה
import {JobsRoutingModule} from './jobs-routing.module';
import {EmployeeJobsComponent} from './components/employee-jobs/employee-jobs.component';
import {MatSortModule} from '@angular/material/sort';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatFormField} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddJobEmoloyeeComponent} from './components/add-job-emoloyee/add-job-emoloyee.component';
import {EditJobEmployeeComponent} from './components/edit-job-employee/edit-job-employee.component';
import {AddJobComponent} from './components/add-job/add-job.component';
import {JobsComponent} from './components/jobs/jobs.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
	declarations: [
		EmployeeJobsComponent,
		AddJobEmoloyeeComponent,
		EditJobEmployeeComponent,
		AddJobComponent,
		JobsComponent,
	],
	imports: [
		CommonModule,
		JobsRoutingModule,
		MatIconModule,
		MatTableModule,
		MatSortModule,
		HttpClientModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatFormField,
		MatDividerModule,
		MatDatepickerModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatListModule,
	],
})
export class JobsModule {}
