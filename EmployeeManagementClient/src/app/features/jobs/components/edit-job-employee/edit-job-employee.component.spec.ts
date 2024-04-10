import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditJobEmployeeComponent} from './edit-job-employee.component';

describe('EditJobEmployeeComponent', () => {
	let component: EditJobEmployeeComponent;
	let fixture: ComponentFixture<EditJobEmployeeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EditJobEmployeeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EditJobEmployeeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
