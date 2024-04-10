import {Employee} from './../../../../models/employee.model';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import {JobService} from '../../../../services/job.service';
import {JobEmployee} from '../../../../models/jobEmployee.model';
import {Job} from '../../../../models/job.model';
import {EmployeesService} from '../../../../services/employees.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDatepicker} from '@angular/material/datepicker';

@Component({
	selector: 'app-add-job-emoloyee',
	templateUrl: './add-job-emoloyee.component.html',
	styleUrl: './add-job-emoloyee.component.scss',
})
export class AddJobEmoloyeeComponent implements OnInit {
	jobForm: FormGroup;
	jobs: Job[];
	employeeCode: number;
	employee: Employee;
	date: Date;
	@ViewChild('picker1') picker1: MatDatepicker<Date>;
	constructor(
		private jobService: JobService,
		private formBuilder: FormBuilder,
		private employeesService: EmployeesService,
		private dialogRef: MatDialogRef<AddJobEmoloyeeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		this.employeeCode = data;
	}
	ngOnInit(): void {
		this.initForm();
		this.employeesService.getEmployeeById(this.employeeCode).subscribe(
			(result) => {
				this.employee = result;
			},
			
		);

		this.loadJobs();
		this.jobForm.get('dateOfEntry').valueChanges.subscribe(() => {
			this.validateEntryDate();
		});
	}

	initForm(): void {
		this.jobForm = this.formBuilder.group({
			roleId: ['', Validators.required],
			isAdmin: ['', Validators.required],
			dateOfEntry: ['', Validators.required],
		});
	}

	loadJobs() {
		this.jobService
			.getAllJobsPossibilities(this.employeeCode)
			.subscribe((jobs) => {
				this.jobs = jobs;
			});
	}
	closeDialog(): void {
		this.dialogRef.close();
	}
	validateEntryDate() {
		const entryDate = this.jobForm?.get('dateOfEntry').value;
		if (
			this.employee &&
			new Date(entryDate) < new Date(this.employee.startOfWorkDate)
		) {
			this.jobForm.get('dateOfEntry').setErrors({invalidDateOfEntry: true});
		} else {
			this.jobForm?.get('dateOfEntry')?.setErrors(null);
		}
	}

	addJobEmoloyee(): void {
		if (this.jobForm.valid) {
			const newJobEmployee: JobEmployee = this.jobForm.value;
			newJobEmployee.employeeId = this.employeeCode;
			this.jobService.addJobEmployee(newJobEmployee).subscribe(
				() => {
					this.dialogRef.close();
				},
				(error) => {
					this.dialogRef.close();
				},
			);
		}
	}
}
