import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CoinsService } from '../coins/services/coins.service';
import { map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Coin } from '../coins/models/coin.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public showSpinner = false;
  public coins = [];
  public coins$: Observable<Coin[]> = of([]);
  public itemList = [];
  public selectedItems = [
    {symbol:'BTC', name: 'Bitcoin', id: 1, iconUrl: 'https://cdn.coinranking.com/gNsKAuE-W/bitcoin_btc.svg'},
    {symbol:'ETH', name: 'Ethereum', id: 2, iconUrl: 'https://cdn.coinranking.com/rk4RKHOuW/eth.svg'},
    {symbol:'XLM', name: 'Stellar', id: 6, iconUrl: 'https://cdn.coinranking.com/78CxK1xsp/Stellar_symbol_black_RGB.svg'},
  ].map((e) => new Coin(e));
  public settings = {};

  @Output() public deleteCoin = new EventEmitter<Coin>();
  @Output() public addCoin = new EventEmitter<Coin>();

  constructor(private coinsService: CoinsService) {}

  public ngOnInit() {
    this.settings = {
      text: "Search currency",
      enableSearchFilter: true,
      searchBy: ['itemName'],
      badgeShowLimit: 5,
      labelKey: "name",
      limitSelection: 10
    };
    this.selectedItems.forEach((coin) => this.addCoin.emit(coin));
  }

  public onItemSelect(coin: Coin) {
    this.addCoin.emit(coin);
  }

  public OnItemDeSelect(coin: Coin) {
    this.deleteCoin.emit(coin);
  }

  public onSelectAll(items: any) {}

  public onDeSelectAll(items: any) {}

  public onChange(searchValue): void {
    this.showSpinner = false;
    if (!searchValue || searchValue.length < 1) {
      this.coins = [];
    } else {
      this.showSpinner = true;
      this.coins$ = this.coinsService.getCointsByParam({prefix: searchValue})
      .pipe(tap((e) => {
        this.coins = e;
        this.showSpinner = false;
        return e;
      }));
    }
  }
}
