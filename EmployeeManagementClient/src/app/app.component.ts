import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {MatNativeDateModule} from '@angular/material/core';
import {FooterComponent} from './components/footer/footer.component';
import {HomePageComponent} from './components/home-page/home-page.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		TopBarComponent,
		MatNativeDateModule,
		HomePageComponent,
		FooterComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'EmployeeManagementClient';
}
