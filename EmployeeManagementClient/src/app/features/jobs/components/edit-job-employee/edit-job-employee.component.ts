
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {JobService} from '../../../../services/job.service';
import {MatDatepicker} from '@angular/material/datepicker';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeesService} from '../../../../services/employees.service';
import { Employee } from '../../../../models/employee.model';
import { JobEmployee } from '../../../../models/jobEmployee.model';

@Component({
	selector: 'app-edit-job-employee',
	templateUrl: './edit-job-employee.component.html',
	styleUrl: './edit-job-employee.component.scss',
})
export class EditJobEmployeeComponent implements OnInit {
	employeeId: number;
	jobId: number;
	employeeJobForm: FormGroup;
	jobEmployee: JobEmployee;
	employee: Employee;

	@ViewChild('picker1') picker1: MatDatepicker<Date>;

	constructor(
		private jobService: JobService,
		private router: Router,
		private employeesService: EmployeesService,
		private formBuilder: FormBuilder,
		private dialogRef: MatDialogRef<EditJobEmployeeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		this.employeeId = data.employeeId;
		this.jobId = data.roleId;
	}
	ngOnInit(): void {
	
		this.employeesService.getEmployeeById(this.employeeId).subscribe(
			(result) => {
				this.employee = result;
			},
			
		);
		this.jobService
			.getByJobIdEmployeeId(this.employeeId, this.jobId)
			.subscribe((result) => {
				this.jobEmployee = result;
				this.fillForm();
			});
		this.initForm();
		// });
		this.employeeJobForm.get('dateOfEntry').valueChanges.subscribe(() => {
			this.validateEntryDate();
		});
	}

	initForm() {
		this.employeeJobForm = this.formBuilder.group({
			isAdmin: ['', Validators.required],
			dateOfEntry: ['', Validators.required],
		});
	}
	closeDialog(): void {
		this.dialogRef.close();
	}
	validateEntryDate() {
		const entryDate = this.employeeJobForm?.get('dateOfEntry').value;
		if (
			this.employee &&
			new Date(entryDate) < new Date(this.employee.startOfWorkDate)
		) {
			this.employeeJobForm
				.get('dateOfEntry')
				.setErrors({invalidDateOfEntry: true});
		} else {
			this.employeeJobForm?.get('dateOfEntry')?.setErrors(null);
		}
	}
	fillForm() {
		this.employeeJobForm.setValue({
			isAdmin: this.jobEmployee.isAdmin,
			dateOfEntry: this.jobEmployee.dateOfEntry,
		});
	}
	updateJobEmployee() {
		if (this.employeeJobForm.valid) {
			const updateJobEmployee: JobEmployee = this.employeeJobForm.value;
			this.jobService
				.updateJobEmployee(this.employeeId, this.jobId, updateJobEmployee)
				.subscribe(
					() => {
						this.router.navigate(['/employees']);
						this.dialogRef.close();
					},
					(error) => this.dialogRef.close(),
				);
		}
	}
}
