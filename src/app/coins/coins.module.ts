import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CoinsComponent } from './components/coins/coins.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { MatCardModule } from '@angular/material/card';
import { SearchModule } from '../search/search.module';
import { MatProgressSpinnerModule, MatIconModule, MatButtonModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { TableModule } from '../table/table.module';

@NgModule({
  declarations: [
    CoinsComponent,
    GraphicsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    SearchModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    TableModule
  ]
})
export class CoinsModule { }
