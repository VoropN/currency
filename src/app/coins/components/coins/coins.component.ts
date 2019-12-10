import { Component, OnInit } from '@angular/core';
import { CoinsService } from '../../services/coins.service';
import { Observable, of } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { Coin } from '../../models/coin.model';
import { DataChart } from '../../models/data-chart.model';
import { CoinsResponseHistory } from '../../models/coins-response-history.model';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
  public baseCoins: {info: Coin, data$: Observable<DataChart>}[];

  constructor(public coinsService: CoinsService) { }

  public ngOnInit(): void {
    this.baseCoins = this.coinsService.coins.map((coin) => ({
      info: coin,
      data$:
        this.coinsService.getDataToCurrency(coin.id, this.coinsService.timePeriod)
          .pipe(concatMap(({data}: CoinsResponseHistory): Observable<DataChart> =>
            of({coin, history: data && data.history})))
    }));
  }

  public coinsTrackByFn(index: number, coin: {info: Coin, data$: Observable<DataChart>}): number {
    return coin.info.id;
  }

  public onSearch(searchValue: string): void {
    console.log(searchValue)
  }
}
