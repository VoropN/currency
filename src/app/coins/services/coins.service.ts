import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Coin } from '../models/coin.model';
import { Observable } from 'rxjs';
import { CoinsResponsePrefix } from '../models/coins-response-prefix.model';
import { tap, map, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  public coins: Coin[] = [
    {symbol:'BTC', name: 'Bitcoin', id: 1, iconUrl: 'https://cdn.coinranking.com/gNsKAuE-W/bitcoin_btc.svg'},
    {symbol:'ETH', name: 'Ethereum', id: 2, iconUrl: 'https://cdn.coinranking.com/rk4RKHOuW/eth.svg'},
    {symbol:'XLM', name: 'Stellar', id: 6, iconUrl: 'https://cdn.coinranking.com/78CxK1xsp/Stellar_symbol_black_RGB.svg'},
  ];
  public timePeriod = '30d';

  constructor(private http: HttpClient) {}

  private apiCreator(coin_id, timePeriod) {
    const baseCurrency = 'USD';
    return `https://api.coinranking.com/v1/public/coin/${coin_id}/history/${timePeriod}?base=${baseCurrency}`;
  }

  public getDataToCurrency(coin_id, timePeriod) {
    return this.http.get(this.apiCreator(coin_id, timePeriod));
  }

  public getCointsTypeByParam(paramObj: object = {}): Observable<any> {
      let params = new HttpParams();
      Object.keys(paramObj).forEach((key: string) => params = params.set(key, paramObj[key]));
      return this.http.get<any>(`https://api.coinranking.com/v1/public/coins`, {params}).pipe(
        debounceTime(200),
        map(({data}) => data && data.coins && data.coins.map((coin) => new Coin(coin))));
  }
}
