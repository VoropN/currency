import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MatSortModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
