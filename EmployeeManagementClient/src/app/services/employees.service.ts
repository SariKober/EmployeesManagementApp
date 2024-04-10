import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Employee} from '../models/employee.model';

@Injectable({
	providedIn: 'root',
})
export class EmployeesService {
	private baseUrl = 'https://localhost:7005/api';

	constructor(private http: HttpClient) {}

	getAllEmployees(): Observable<Employee[]> {
		return this.http.get<Employee[]>(`${this.baseUrl}/Employee`);
	}
	deleteEmployee(employeeCode: number): Observable<Employee> {
		return this.http.delete<Employee>(
			`${this.baseUrl}/Employee/${employeeCode}`,
		);
	}
	addEmployee(employee: Employee): Observable<Employee> {
		return this.http.post<Employee>(`${this.baseUrl}/Employee`, employee);
	}
	updateEmployee(code: number, employee: Employee): Observable<Employee> {
		return this.http.put<Employee>(
			`${this.baseUrl}/Employee/${code}`,
			employee,
		);
	}
	getEmployeeById(code: number): Observable<Employee> {
		return this.http.get<Employee>(`${this.baseUrl}/Employee/${code}`);
	}
}
