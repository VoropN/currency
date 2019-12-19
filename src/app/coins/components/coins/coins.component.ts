import { Component, OnDestroy } from '@angular/core';
import { CoinsService } from '../../services/coins.service';
import { Coin } from '../../models/coin.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoinHistory } from '../../models/coin-history.model';
import { ResponseCoins } from '../../models/response-coins.model';
import { ResponseHistory } from '../../models/response-history';


@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnDestroy {
  private destroy$ = new Subject();
  private timePeriod = '30d';
  public coinsHistory: CoinHistory[] = [];
  public showSpinner: boolean;

  constructor(public coinsService: CoinsService) { }

  public coinsTrackByFn(index: number, coinDetails: CoinHistory): number {
    return coinDetails && coinDetails.coin.id;
  }

  public onAdd(coin: Coin): void {
    this.showSpinner = true;
    this.coinsService.getDataByCurrency(coin.id, this.timePeriod)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: ResponseHistory): void  => {
      const coinHistory = new CoinHistory();
      coinHistory.coin = coin;
      coinHistory.history = response.data && response.data.history;
      this.coinsHistory.push(coinHistory);
      this.showSpinner = false;
    });

  }

  public onDelete(coin: Coin): void {
    this.coinsHistory = this.coinsHistory.filter((coinHistory: CoinHistory): boolean => coinHistory.coin.id !== coin.id);
  }

  public onDeleteAll(): void {
    this.coinsHistory = [];
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
