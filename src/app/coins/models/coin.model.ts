export class Coin {
  id: number;
  name: string;
  symbol: string;
  iconUrl: string;
  price?: number;
  itemName: string;

  constructor({id, name, symbol, iconUrl, slug = null, price = null}) {
    Object.entries({id, name, symbol, iconUrl, slug, price}).forEach(([key, value]) => value && (this[key] = value));
    this.itemName = name;
  }
}
