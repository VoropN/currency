import { CoinHistory } from './coin-history.model';
import { Coin } from './coin.model';

export interface DataChart {
  coin: Coin;
  history: CoinHistory[];
}
