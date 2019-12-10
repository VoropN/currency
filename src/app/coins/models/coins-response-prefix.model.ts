import { Coin } from './coin.model';

export interface CoinsResponsePrefix {
  status: string;
  data: {
    change: number,
    coins: Coin
  }
}