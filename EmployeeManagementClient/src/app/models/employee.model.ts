import {Gender} from './gender.model';

export class Employee {
	public code: number;
	public id: string;
	public firstName: string;
	public lastName: string;
	public startOfWorkDate: Date;
	public dateOfBirth: Date;
	public gender: Gender;

	constructor(
		code: number,
		id: string,
		firstName: string,
		lastName: string,
		startOfWorkDate: Date,
		dateOfBirth: Date,
		gender: Gender,
	) {
		this.code = code;
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.startOfWorkDate = startOfWorkDate;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
	}
}
