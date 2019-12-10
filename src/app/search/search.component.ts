import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CoinsService } from '../coins/services/coins.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchForm;
  public coinsType$;
  @Output() searchInit = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private coinsService: CoinsService) {}

  public ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ''
    });
  }

  public onChange(): void {
    const searchValue = this.searchForm.get('search').value;
    if (searchValue.length >= 2) {
      console.log(searchValue)
      this.coinsType$ = this.coinsService.getCointsTypeByParam({prefix: searchValue});
    } else {
      this.coinsType$ = null;
    }

    // this.searchInit.emit(searchInputValue);
  }

}
