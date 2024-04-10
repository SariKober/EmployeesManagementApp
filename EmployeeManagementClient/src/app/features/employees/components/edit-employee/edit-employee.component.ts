
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeesService} from '../../../../services/employees.service';
import {Employee} from '../../../../models/employee.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EditJobEmployeeComponent} from '../../../jobs/components/edit-job-employee/edit-job-employee.component';

@Component({
	selector: 'app-edit-employee',
	templateUrl: './edit-employee.component.html',
	styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit {
	employeeForm: FormGroup;
	employeeCode: number;
	// employees: Employee[] = [];
	employee: Employee;

	constructor(
		private employeesService: EmployeesService,
		private formBuilder: FormBuilder,
		private dialogRef: MatDialogRef<EditJobEmployeeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		this.employeeCode = data.employeeId;
	}
	ngOnInit(): void {

		this.employeesService
			.getEmployeeById(this.employeeCode)
			.subscribe((result) => {
				this.employee = result;
				this.fillForm();
			});
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
	fillForm(): void {
		this.employeeForm.setValue({
			firstName: this.employee.firstName,
			lastName: this.employee.lastName,
			id: this.employee.id,
			startOfWorkDate: this.employee.startOfWorkDate,
			dateOfBirth: this.employee.dateOfBirth,
			gender: this.employee.gender,
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
	updateEmployee() {
		if (this.employeeForm.valid) {
			const updateEmployee: Employee = this.employeeForm.value;
			this.employeesService
				.updateEmployee(this.employeeCode, updateEmployee)
				.subscribe(
					() => {
						this.dialogRef.close();
					},
					(error) => this.dialogRef.close(),
				);
		}
	}
}
