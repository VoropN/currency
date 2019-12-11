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
  private api = 'https://api.coinranking.com/v1/public/';
  private baseCurrency = 'USD';

  constructor(private http: HttpClient) {}
  
  public getDataByCurrency(coin_id, timePeriod) {
    return this.http.get(`${this.api}coin/${coin_id}/history/${timePeriod}?base=${this.baseCurrency}`);
  }

  public getCointsByParam(paramObj: object = {}): Observable<any> {
      let params = new HttpParams();
      Object.keys(paramObj).forEach((key: string) => params = params.set(key, paramObj[key]));
      return this.http.get<any>(`${this.api}coins`, {params}).pipe(
        debounceTime(200),
        map(({data}) => data && data.coins && data.coins.map((coin) => new Coin(coin))));
  }
}
