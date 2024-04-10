import {Routes} from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		loadComponent: () =>
			import('./components/home-page/home-page.component').then(
				(c) => c.HomePageComponent,
			),
	},

	{
		path: 'employees',
		loadChildren: () =>
			import('./features/employees/employee.module').then((c) => c.EmployeeModule),
	},
	{
		path: 'jobs',
		loadChildren: () =>
			import('./features/jobs/jobs.module').then((c) => c.JobsModule),
	},
];
