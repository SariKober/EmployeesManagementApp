import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeJobsComponent} from './employee-jobs.component';

describe('EmployeeJobsComponent', () => {
	let component: EmployeeJobsComponent;
	let fixture: ComponentFixture<EmployeeJobsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EmployeeJobsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EmployeeJobsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
