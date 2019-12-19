import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Coin } from '../models/coin.model';
import { Observable, throwError } from 'rxjs';
import { map, debounceTime, retry, catchError } from 'rxjs/operators';
import { Api } from 'src/app/shared/config/api.enum';
import { CoinsApi } from '../models/api/coins-api.model';
import { HistoryApi } from '../models/api/history-api';
import { SearchParams } from '../models/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  private baseCurrency = 'USD';

  constructor(private http: HttpClient) {}

  public getDataByCurrency(coinId: number, timePeriod: string): Observable<HistoryApi> {
    return this.http.get<HistoryApi>(`${Api.currency}coin/${coinId}/history/${timePeriod}?base=${this.baseCurrency}`)
      .pipe(
        retry(3),
        catchError((error) => this.handleError(error, 'getDataByCurrency', coinId)));
  }

  public getCointsByParam(searchParams: SearchParams): Observable<Coin[]> {
    let params = new HttpParams();
    Object.keys(searchParams).forEach((key: string): HttpParams => params = params.set(key, searchParams[key]));
    return this.http.get<CoinsApi>(`${Api.currency}coins`, {params})
      .pipe(
        debounceTime(200),
        map((response: CoinsApi): Coin[] => response.data && response.data.coins && response.data.coins.map((coin) => new Coin(coin))),
        retry(3),
        catchError((error) => this.handleError(error, 'getCointsByParam', searchParams)));
  }

  private handleError(error: HttpErrorResponse, methodName, params): Observable<never> {
    console.error(`"${methodName}" method received an error while trying to get data for params "${JSON.stringify(params)}"`);
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
