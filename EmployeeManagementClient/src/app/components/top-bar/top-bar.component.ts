import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';

@Component({
	selector: 'app-top-bar',
	standalone: true,
	imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
	templateUrl: './top-bar.component.html',
	styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {}
