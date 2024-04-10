import {EmployeesService} from '../../../../services/employees.service';
import {Employee} from '../../../../models/employee.model';
import {JobService} from '../../../../services/job.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {DeledeDialogComponent} from '../../../../components/delede-dialog/delede-dialog.component';
import {JobEmployee} from '../../../../models/jobEmployee.model';
import * as XLSX from 'xlsx';
import {AddJobEmoloyeeComponent} from '../add-job-emoloyee/add-job-emoloyee.component';
import {EditJobEmployeeComponent} from '../edit-job-employee/edit-job-employee.component';
export interface PeriodicElement {
	roleId: number;
	jobName: string;
	isAdmin: boolean;
	dateOfEntry: Date;
}

@Component({
	selector: 'app-employee-jobs',
	templateUrl: './employee-jobs.component.html',
	styleUrl: './employee-jobs.component.scss',
})
export class EmployeeJobsComponent implements AfterViewInit, OnInit {
	employeeCode: number;
	employee: Employee;
	employeeJobs: JobEmployee[] = [];
	displayedColumns: string[] = [
		'delete',
		'edit',
		'dateOfEntry',
		'isAdmin',
		'jobName',
	];
	dataSource = new MatTableDataSource([]);
	loadingData: boolean = true;
	constructor(
		private jobService: JobService,
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private employeesService: EmployeesService,
	) {}
	ngOnInit(): void {
		this.loadingData = true;
		this.activatedRoute.queryParams.subscribe((params) => {
			this.employeeCode = params['code'];
		});
		this.employeesService
			.getEmployeeById(this.employeeCode)
			.subscribe((result) => {
				this.employee = result;
			});
	}
	@ViewChild(MatSort) sort!: MatSort;
	ngAfterViewInit(): void {
		this.jobService.getEmployeeJobs(this.employeeCode).subscribe((result) => {
			this.employeeJobs = result;
			this.loadingData = false;
			this.dataSource = new MatTableDataSource(this.employeeJobs);
			this.dataSource.sort = this.sort;
		});
	}
	exportToExcel(): void {
		const data: PeriodicElement[] = this.dataSource.data;
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		XLSX.writeFile(wb, 'employeeJobs.xlsx');
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}

	openAddJobEmployeeDialog(data: any): void {
		const dialogRef = this.dialog.open(AddJobEmoloyeeComponent, {
			width: '40%',
			height: '60%',
			data: this.employeeCode,
		});
	}
	deleteJob(jobEmployee: JobEmployee): void {
		const dialogRef = this.dialog.open(DeledeDialogComponent, {
			data: jobEmployee.role.name,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.jobService
					.deleteJobEmployee(this.employeeCode, jobEmployee.roleId)
					.subscribe(() => {
						this.jobService
							.getEmployeeJobs(this.employeeCode)
							.subscribe((result) => {
								this.employeeJobs = result;
								this.dataSource = new MatTableDataSource(this.employeeJobs);
							});
					});
			}
		});
	}
	openEditJobEmployeeDialog(data: any): void {
		const dialogRef = this.dialog.open(EditJobEmployeeComponent, {
			width: '40%',
			height: '60%',
			data: {employeeId: this.employeeCode, roleId: data.roleId},
		});
	}
}
