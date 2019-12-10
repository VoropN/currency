import { CoinHistory } from './coin-history.model';

export interface CoinsResponseHistory {
  status: string;
  data: {
    change: number,
    history: CoinHistory[]
  }
}