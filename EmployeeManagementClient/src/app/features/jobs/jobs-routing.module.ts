import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeJobsComponent} from './components/employee-jobs/employee-jobs.component';
import { JobsComponent } from './components/jobs/jobs.component';


const routes: Routes = [
	{path: 'employee-jobs', component: EmployeeJobsComponent},
	{path: 'all-jobs', component: JobsComponent},
	{
		path: '',
		redirectTo: 'employee-jobs',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class JobsRoutingModule {}
