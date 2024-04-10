import {JobService} from './../../../../services/job.service';
import {Component, OnInit} from '@angular/core';
import {Job} from '../../../../models/job.model';
import {MatDialog} from '@angular/material/dialog';
import {AddJobComponent} from '../add-job/add-job.component';

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrl: './jobs.component.scss',
})
export class JobsComponent implements OnInit {
	jobs: Job[] = [];
	constructor(
		private jobService: JobService,
		private dialog: MatDialog,
	) {}
	ngOnInit(): void {
		this.jobService.getAllJobs().subscribe((jobs) => {
			this.jobs = jobs;
		});
	}
	toAddJob(): void {
		const dialogRef = this.dialog.open(AddJobComponent, {
			width: '40%',
			height: '40%',
		});
	}
}
