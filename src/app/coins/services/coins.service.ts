import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Coin } from '../models/coin.model';
import { Observable } from 'rxjs';
import { CoinsResponse } from '../models/coins-response.model';
import { map, debounceTime } from 'rxjs/operators';
import { Api } from 'src/app/shared/config/api.enum';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  private baseCurrency = 'USD';

  constructor(private http: HttpClient) {}

  public getDataByCurrency(coinId, timePeriod): Observable<CoinsResponse> {
    return this.http.get<CoinsResponse>(`${Api.currency}coin/${coinId}/history/${timePeriod}?base=${this.baseCurrency}`);
  }

  public getCointsByParam(paramObj: object = {}): Observable<Coin[]> {
    let params = new HttpParams();
    Object.keys(paramObj).forEach((key: string) => params = params.set(key, paramObj[key]));
    return this.http.get<CoinsResponse>(`${Api.currency}coins`, {params}).pipe(
      debounceTime(200),
      map(({data}) => data && data.coins && data.coins.map((coin) => new Coin(coin))));
  }
}
