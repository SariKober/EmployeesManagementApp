import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeledeDialogComponent} from './delede-dialog.component';

describe('DeledeDialogComponent', () => {
	let component: DeledeDialogComponent;
	let fixture: ComponentFixture<DeledeDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DeledeDialogComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DeledeDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
