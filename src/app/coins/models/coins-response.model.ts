import { CoinHistory } from './coin-history.model';
import { Coin } from './coin.model';

export interface CoinsResponse {
  status: string;
  data: {
    change: number,
    history?: CoinHistory[],
    coins?: Coin[]
  };
}
