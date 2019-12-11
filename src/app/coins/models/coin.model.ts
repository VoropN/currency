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

    // allTimeHigh: {price: "5.912189649828956", timestamp: 1506643200000}
// approvedSupply: true
// change: -5.29
// circulatingSupply: 604421968
// color: "#595b5b"
// confirmedSupply: true
// description: "0x is a decentralized exchange protocol that enables low friction exchange between ERC20 tokens on the Ethereum blockchain."
// firstSeen: 1502409600000
// history: (27) ["0.2335145691", "0.2328178469", "0.2304757301", "0.2313275526", "0.2316111964", "0.2317741183", "0.2299365978", "0.2256011139", "0.2258903026", "0.2235947353", "0.2253974476", "0.2254387908", "0.2254179285", "0.2268060633", "0.2269486193", "0.22595285", "0.2257275694", "0.2262650153", "0.2261686312", "0.2262337799", "0.2268341516", "0.2241034856", "0.2223074168", "0.2219905699", "0.221424855", "0.221346802", "0.2211699999"]
// iconType: "vector"
// iconUrl: "https://cdn.coinranking.com/Hy7oqBSFW/zrx.svg"
// id: 25
// links: (5) [{…}, {…}, {…}, {…}, {…}]
// marketCap: 133680007
// name: "0x"
// numberOfExchanges: 83
// numberOfMarkets: 209
// penalty: false
// price: "0.2211699999"
// rank: 38
// slug: "0x-zrx"
// socials: (4) [{…}, {…}, {…}, {…}]
// symbol: "ZRX"
// totalSupply: 1000000000
// type: "coin"
// uuid: "jWvjEFGAtnhWN"
// volume: 23803930
// websiteUrl: "https://0xproject.com/"