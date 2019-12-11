import { Component, OnInit } from '@angular/core';
import { CoinsService } from '../../services/coins.service';
import { Observable, of } from 'rxjs';
import { tap, concatMap, map } from 'rxjs/operators';
import { Coin } from '../../models/coin.model';
import { DataChart } from '../../models/data-chart.model';
import { CoinsResponseHistory } from '../../models/coins-response-history.model';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
  public coins = [];
  public timePeriod = '30d';
  constructor(public coinsService: CoinsService) { }

  public ngOnInit(): void {
  }
  
  public coinsTrackByFn(index: number, {coin: {id}}): number {
    return id;
  }

  public onAdd(coin: Coin): void {
    this.coins.push({
      coin,
      data$: this.coinsService.getDataByCurrency(coin.id, this.timePeriod).pipe(
        concatMap(({data}: CoinsResponseHistory): Observable<DataChart> => of({coin, history: data && data.history})))
    });
  }

  public onDelete(coin: Coin): void {
    this.coins = this.coins.filter(({coin: {id}}) => id !== coin.id);
  }
}
