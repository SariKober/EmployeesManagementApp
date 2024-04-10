import {MatDialog} from '@angular/material/dialog';
import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JobService} from '../../../../services/job.service';
import {Router} from '@angular/router';
import { Job } from '../../../../models/job.model';


@Component({
	selector: 'app-add-job',
	templateUrl: './add-job.component.html',
	styleUrl: './add-job.component.scss',
})
export class AddJobComponent {
	jobName: FormControl = new FormControl('', [
		Validators.required,
		Validators.minLength(2),
	]);
	jobNameForm: FormGroup = new FormGroup({
		jobName: this.jobName,
	});
	constructor(
		private jobService: JobService,
		private router: Router,
		private dialog: MatDialog,
	) {}

	onSubmit() {
		if (this.jobNameForm.valid) {
			const jobData: Job = {
				id: null,
				name: this.jobNameForm.get('jobName').value,
			};

			this.jobService.addJob(jobData).subscribe(() => {
				this.dialog.closeAll();
				this.router.navigate(['/jobs/all-jobs']);
			});
		}
	}
}
