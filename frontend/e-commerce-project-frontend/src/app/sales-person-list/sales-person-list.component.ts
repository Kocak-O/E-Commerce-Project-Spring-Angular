import { Component } from '@angular/core';
import { SalesPerson } from './sales-person';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-person-list',
  imports: [CommonModule],
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent {
  salesPersonList: SalesPerson[] = [
    new SalesPerson("Osman","Kocak","osman.kocak@stud.sbg.ac.at", 120),
    new SalesPerson("Osman","Kocak","osman.kocak@stud.sbg.ac.at", 100),
    new SalesPerson("Osman","Kocak","osman.kocak@stud.sbg.ac.at", 80),
    new SalesPerson("Osman","Kocak","osman.kocak@stud.sbg.ac.at", 120),
    new SalesPerson("Osman","Kocak","osman.kocak@stud.sbg.ac.at", 60)
  ]
}
