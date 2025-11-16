import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import { SalesPerson } from './sales-person-list/sales-person';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SalesPersonListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
