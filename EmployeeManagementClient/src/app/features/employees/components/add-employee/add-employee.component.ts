import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Employee} from '../../../../models/employee.model';
import {EmployeesService} from '../../../../services/employees.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddJobEmoloyeeComponent} from '../../../jobs/components/add-job-emoloyee/add-job-emoloyee.component';

@Component({
	selector: 'app-add-employee',
	templateUrl: './add-employee.component.html',
	styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
	employeeForm: FormGroup;
	constructor(
		private employeesService: EmployeesService,
		private formBuilder: FormBuilder,
		private dialogRef: MatDialogRef<AddJobEmoloyeeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {}
	ngOnInit(): void {
		this.initForm();
	}
	initForm(): void {
		this.employeeForm = this.formBuilder.group({
			firstName: ['', [Validators.required, Validators.minLength(2)]],
			lastName: ['', [Validators.required, Validators.minLength(2)]],
			id: ['', [Validators.required, Validators.pattern(/^\d{8,9}$/)]],
			startOfWorkDate: ['', Validators.required],
			dateOfBirth: ['', [Validators.required, this.minimumAgeValidator(18)]],
			gender: ['', Validators.required],
		});
	}
	// פונקציית ולידציה מותאמת אישית לוודא גיל מינימלי
	minimumAgeValidator(minimumAge: number) {
		return (control) => {
			const currentDate = new Date();
			const birthDate = new Date(control.value);
			let age = currentDate.getFullYear() - birthDate.getFullYear();
			const monthDiff = currentDate.getMonth() - birthDate.getMonth();
			if (
				monthDiff < 0 ||
				(monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
			) {
				age--;
			}
			return age >= minimumAge ? null : {minimumAge: true};
		};
	}

	closeDialog(): void {
		this.dialogRef.close();
	}
	addEmployee(): void {
		if (this.employeeForm.valid) {
			const newEmployee: Employee = this.employeeForm.value;

			this.employeesService.addEmployee(newEmployee).subscribe(
				() => {
					this.dialogRef.close();
					location.reload();
				},
				
				(error) => this.dialogRef.close(),
			);
		}
	}
}
