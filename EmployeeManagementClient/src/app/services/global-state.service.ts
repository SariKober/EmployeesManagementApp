import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject} from 'rxjs';
import {Employee} from '../models/employee.model';
import {JobEmployee} from '../models/jobEmployee.model';

@Injectable({
	providedIn: 'root',
})
export class GlobalStateService {
	private filteredEmployeesSubject = new BehaviorSubject<Employee[]>([]);
	filteredEmployees$ = this.filteredEmployeesSubject.asObservable();
	private filteredEmployeeJobsSubject = new BehaviorSubject<JobEmployee[]>([]);
	filteredEmployeeJobs$ = this.filteredEmployeeJobsSubject.asObservable();

	constructor() {}

	applyFilter(dataSource: MatTableDataSource<Employee>, filterValue: string) {
		filterValue = filterValue.trim().toLowerCase();
		dataSource.filter = filterValue;

		// Get the filtered data from the dataSource
		const filteredData = dataSource.filteredData;

		// Update the BehaviorSubject with the filtered data
		this.filteredEmployeesSubject.next(filteredData);
	}
	applyFilterJobEmployee(
		dataSource: MatTableDataSource<JobEmployee>,
		filterValue: string,
	) {
		filterValue = filterValue.trim().toLowerCase();
		dataSource.filter = filterValue;

		// Get the filtered data from the dataSource
		const filteredData = dataSource.filteredData;

		// Update the BehaviorSubject with the filtered data
		this.filteredEmployeeJobsSubject.next(filteredData);
	}
}
