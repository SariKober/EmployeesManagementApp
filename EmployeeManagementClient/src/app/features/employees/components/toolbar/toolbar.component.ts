import { EmployeesService } from './../../../../services/employees.service';
import {GlobalStateService} from './../../../../services/global-state.service';
import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {Employee} from '../../../../models/employee.model';
import {MatTableDataSource} from '@angular/material/table';
import {AddEmployeeComponent} from '../add-employee/add-employee.component';
import {MatDialog} from '@angular/material/dialog';
export interface PeriodicElement {
	firstName: string;
	lastName: string;
	id: string;
	startOfWorkDate: Date;
}
@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
	employees: MatTableDataSource<Employee>;
	constructor(
		private dialog: MatDialog,
		private employeesService: EmployeesService,
		private globalStateService: GlobalStateService,
	) {}
	ngOnInit(): void {
		this.getEmployees();
	}
	getEmployees() {
		this.employeesService.getAllEmployees().subscribe((employees) => {
			this.employees = new MatTableDataSource<Employee>(employees);
		});
	}

	applyFilter(filterValue: string) {
		this.globalStateService.applyFilter(this.employees, filterValue);
	}
	exportToExcel(): void {
		this.employees.connect().subscribe(data => {
		  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
		  const wb: XLSX.WorkBook = XLSX.utils.book_new();
		  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		  XLSX.writeFile(wb, 'employees.xlsx');
		});
	  }
	addEmployee(): void {
		const dialogRef = this.dialog.open(AddEmployeeComponent, {
			width: '50%',
			height: '65%',
		});
	}
}
