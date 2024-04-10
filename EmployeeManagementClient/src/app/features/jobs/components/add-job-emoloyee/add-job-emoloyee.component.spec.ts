import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddJobEmoloyeeComponent} from './add-job-emoloyee.component';

describe('AddJobEmoloyeeComponent', () => {
	let component: AddJobEmoloyeeComponent;
	let fixture: ComponentFixture<AddJobEmoloyeeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AddJobEmoloyeeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AddJobEmoloyeeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
