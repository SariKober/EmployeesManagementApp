import {Employee} from './employee.model';
import {Job} from './job.model';
export class JobEmployee {
	roleId: number;
	employeeId: number;
	isAdmin: boolean;
	dateOfEntry: Date;
	employee: Employee;
	role: Job;

	constructor(
		roleId: number,
		employeeId: number,
		isAdmin: boolean,
		dateOfEntry: Date,
	) {
		this.roleId = roleId;
		this.employeeId = employeeId;
		this.isAdmin = isAdmin;
		this.dateOfEntry = dateOfEntry;
	}
}
