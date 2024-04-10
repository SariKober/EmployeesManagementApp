import {Component, Inject} from '@angular/core';
import {
	MatDialog,
	MatDialogRef,
	MatDialogActions,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
	selector: 'app-delede-dialog',
	standalone: true,
	imports: [
		MatButtonModule,
		MatDialogActions,
		MatDialogClose,
		MatDialogTitle,
		MatDialogContent,
	],
	templateUrl: './delede-dialog.component.html',
	styleUrl: './delede-dialog.component.scss',
})
export class DeledeDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<DeledeDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {}
	onOkClick(): void {
		this.dialogRef.close(true);
	}
}
