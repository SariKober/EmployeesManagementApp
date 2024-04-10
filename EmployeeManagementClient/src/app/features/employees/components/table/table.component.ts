import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Employee} from '../../../../models/employee.model';
import {Router} from '@angular/router';
import {DeledeDialogComponent} from '../../../../components/delede-dialog/delede-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {EmployeesService} from '../../../../services/employees.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {EditEmployeeComponent} from '../edit-employee/edit-employee.component';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
	filteredEmployees: Employee[] = [];
	@Input() employees: MatTableDataSource<Employee, MatPaginator>;
	displayedColumns: string[] = [
		'delete',
		'edit',
		'viewJobs',
		'startOfWorkDate',
		'firstName',
		'lastName',
		'id',
	];
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;


	constructor(
		private readonly router: Router,
		private _liveAnnouncer: LiveAnnouncer,
		private employeesService: EmployeesService,
		public dialog: MatDialog,
	) {}
	ngOnInit(): void {
				this.employees.sort = this.sort;
				this.employees.paginator = this.paginator;
	}

	editEmployee(employee: Employee): void {
		const dialogRef = this.dialog.open(EditEmployeeComponent, {
			width: '50%',
			height: '65%',
			data: {employeeId: employee.code},
		});
	}
	toViewJobs(employee: Employee) {
		this.router.navigate(['jobs/employee-jobs'], {
			queryParams: {code: employee.code},
		});
	}
	deleteEmployee(employee: Employee): void {
		const dialogRef = this.dialog.open(DeledeDialogComponent, {
			data: employee.firstName + ' ' + employee.lastName,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.employeesService.deleteEmployee(employee.code).subscribe(() => {
				});
			}
		});
	}

	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}
}


