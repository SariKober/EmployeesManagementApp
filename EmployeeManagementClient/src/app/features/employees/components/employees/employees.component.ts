import {GlobalStateService} from './../../../../services/global-state.service';
import {Employee} from './../../../../models/employee.model';
import {EmployeesService} from '../../../../services/employees.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.component.html',
	styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements  OnInit {
	firstName: string;
	lastName: string;
	id: string;
	employees: MatTableDataSource<Employee>;
	dataSource = new MatTableDataSource([]);
	filteredEmployees: Employee[] = []; 
showLoader=false;
	constructor(
		private router: Router,
		private _liveAnnouncer: LiveAnnouncer,
		private employeesService: EmployeesService,
		public dialog: MatDialog,
		private globalStateService: GlobalStateService,
	) {}
	ngOnInit(): void {
		
this.showLoader=true;
		this.globalStateService.filteredEmployees$.subscribe(
			(filteredEmployees) => {
				this.filteredEmployees = filteredEmployees;
				this.employees = new MatTableDataSource<Employee>(
					this.filteredEmployees,
				);
			},
		);
		this.getEmployees();
	}
	@ViewChild(MatSort) sort!: MatSort;


	getEmployees() {
		this.employeesService.getAllEmployees().subscribe((employees) => {
			this.employees = new MatTableDataSource(employees);
			  this.showLoader = false;
		});
	}
}