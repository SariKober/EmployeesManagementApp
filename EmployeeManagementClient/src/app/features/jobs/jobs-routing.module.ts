import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeJobsComponent} from './components/employee-jobs/employee-jobs.component';


const routes: Routes = [
	{path: 'employee-jobs', component: EmployeeJobsComponent},

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
