import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './search.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    AngularMultiSelectModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports: [SearchComponent]
})
export class SearchModule {}
