import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeesComponent} from './components/employees/employees.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatFormField} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {AddEmployeeComponent} from './components/add-employee/add-employee.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditEmployeeComponent} from './components/edit-employee/edit-employee.component';
import {TableComponent} from './components/table/table.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';

@NgModule({
	declarations: [
		EmployeesComponent,
		AddEmployeeComponent,
		EditEmployeeComponent,
		TableComponent,
		ToolbarComponent,
	],
	imports: [
		CommonModule,
		EmployeeRoutingModule,
		MatTableModule,
		MatSortModule,
		HttpClientModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatDividerModule,
		MatDatepickerModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class EmployeeModule {}
