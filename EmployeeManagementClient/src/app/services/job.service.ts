import {Employee} from './../models/employee.model';
import {JobEmployee} from './../models/jobEmployee.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Job} from '../models/job.model';

@Injectable({
	providedIn: 'root',
})
export class JobService {
	private baseUrl = 'https://localhost:7005/api';

	constructor(private http: HttpClient) {}
	getEmployeeJobs(code: number): Observable<JobEmployee[]> {
		return this.http.get<JobEmployee[]>(`${this.baseUrl}/RoleEmployee/${code}`);
	}
	addJobEmployee(jobEmployee: JobEmployee): Observable<JobEmployee> {
		return this.http.post<JobEmployee>(
			`${this.baseUrl}/RoleEmployee/`,
			jobEmployee,
		);
	}
	getAllJobsPossibilities(code: number): Observable<Job[]> {
		return this.http.get<Job[]>(`${this.baseUrl}/Role/${code}`);
	}
	deleteJobEmployee(
		employeeId: number,
		jobId: number,
	): Observable<JobEmployee> {
		return this.http.delete<JobEmployee>(
			`${this.baseUrl}/RoleEmployee/${employeeId}/${jobId}`,
		);
	}
	getByJobIdEmployeeId(
		employeeId: number,
		jobId: number,
	): Observable<JobEmployee> {
		return this.http.get<JobEmployee>(
			`${this.baseUrl}/RoleEmployee/${employeeId}/${jobId}`,
		);
	}
	updateJobEmployee(
		employeeId: number,
		jobId: number,
		jobEmployee: JobEmployee,
	): Observable<JobEmployee> {
		return this.http.put<JobEmployee>(
			`${this.baseUrl}/RoleEmployee/${employeeId}/${jobId}`,
			jobEmployee,
		);
	}
	addJob(job: Job): Observable<Job> {
		return this.http.post<Job>(`${this.baseUrl}/Role/`, job);
	}
	getAllJobs(): Observable<Job[]> {
		return this.http.get<Job[]>(`${this.baseUrl}/Role/`);
	}
}
