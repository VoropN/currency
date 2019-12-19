import { Component, OnInit, EventEmitter, Output, Input, ElementRef, OnDestroy } from '@angular/core';
import { CoinsService } from '../coins/services/coins.service';
import { of, Observable, Subject } from 'rxjs';
import { Coin } from '../coins/models/coin.model';
import { takeUntil } from 'rxjs/operators';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';
import { SearchParams } from '../coins/models/search-params.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() public deleteCoin = new EventEmitter<Coin>();
  @Output() public deleteCoinsAll = new EventEmitter<void>();
  @Output() public addCoin = new EventEmitter<Coin>();
  private destroy$ = new Subject();
  public settings: Partial<DropdownSettings>;
  public selectedItems: Coin[];
  public coins: Coin[];
  public showSpinner = true;
  public loading: ElementRef;

  constructor(private coinsService: CoinsService) {}

  public ngOnInit() {
    this.settings = {
      text: 'Search currency',
      labelKey: 'name',
      searchBy: ['name'],
      enableSearchFilter: true,
      enableCheckAll: false,
      enableFilterSelectAll: false,
      escapeToClose: false,
      badgeShowLimit: 10,
      limitSelection: 10,
    };
    this.selectedItems = [
      {symbol: 'BTC', name: 'Bitcoin', id: 1, iconUrl: 'https://cdn.coinranking.com/gNsKAuE-W/bitcoin_btc.svg'},
      {symbol: 'ETH', name: 'Ethereum', id: 2, iconUrl: 'https://cdn.coinranking.com/rk4RKHOuW/eth.svg'},
      {symbol: 'XLM', name: 'Stellar', id: 6, iconUrl: 'https://cdn.coinranking.com/78CxK1xsp/Stellar_symbol_black_RGB.svg'},
    ];
    this.coins = this.selectedItems;
    this.selectedItems.forEach((coin: Coin): void => this.addCoin.emit(coin));
    this.showSpinner = false;
  }

  public onItemSelect(coin: Coin): void {
    this.addCoin.emit(coin);
  }

  public onItemDeSelect(coin: Coin): void {
    this.deleteCoin.emit(coin);
  }

  public onGroupDeSelect(): void {
    this.deleteCoinsAll.emit();
  }

  public onChange(searchValue): void {
    this.showSpinner = false;
    if (!searchValue || searchValue.length < 1) {
      this.coins = [];
    } else {
      this.showSpinner = true;
      this.coinsService.getCointsByParam({prefix: searchValue})
        .pipe(takeUntil(this.destroy$))
        .subscribe((coins: Coin[]): void => {
        this.coins = coins;
        this.showSpinner = false;
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
