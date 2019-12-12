import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatButtonModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
