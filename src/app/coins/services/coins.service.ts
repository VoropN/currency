import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Coin } from '../models/coin.model';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { Api } from 'src/app/shared/config/api.enum';
import { ResponseCoins } from '../models/response-coins.model';
import { ResponseHistory } from '../models/response-history';
import { CoinHistory } from '../models/coin-history.model';
import { SearchParams } from '../models/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  private baseCurrency = 'USD';

  constructor(private http: HttpClient) {}

  public getDataByCurrency(coinId: number, timePeriod: string): Observable<ResponseHistory> {
    return this.http.get<ResponseHistory>(`${Api.currency}coin/${coinId}/history/${timePeriod}?base=${this.baseCurrency}`);
  }

  public getCointsByParam(searchParams: SearchParams): Observable<Coin[]> {
    let params = new HttpParams();
    Object.keys(searchParams).forEach((key: string): HttpParams => params = params.set(key, searchParams[key]));
    return this.http.get<ResponseCoins>(`${Api.currency}coins`, {params}).pipe(
      debounceTime(200),
      map((response: ResponseCoins): Coin[] => response.data && response.data.coins && response.data.coins.map((coin) => new Coin(coin))));
  }
}
