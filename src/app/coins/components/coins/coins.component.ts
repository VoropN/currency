import { Component } from '@angular/core';
import { CoinsService } from '../../services/coins.service';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Coin } from '../../models/coin.model';
import { DataChart } from '../../models/data-chart.model';
import { CoinsResponse } from '../../models/coins-response.model';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent {
  public coins = [];
  public timePeriod = '30d';

  constructor(public coinsService: CoinsService) { }

  public coinsTrackByFn(index: number, {coin: {id}}): number {
    return id;
  }

  public onAdd(coin: Coin): void {
    this.coins.push({
      coin,
      data$: this.coinsService.getDataByCurrency(coin.id, this.timePeriod).pipe(
        concatMap(({data}: CoinsResponse): Observable<DataChart> => of({coin, history: data && data.history})))
    });
  }

  public onDelete(coin: Coin): void {
    this.coins = this.coins.filter(({coin: {id}}) => id !== coin.id);
  }
}
