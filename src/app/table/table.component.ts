import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HistoryPoint } from '../coins/models/history-point.model';
import { Sort } from '@angular/material';
import { saveAs } from 'node_modules/file-saver';
import { CoinHistory } from '../coins/models/coin-history.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() public data: CoinHistory;
  public sortedData: HistoryPoint [];

  public ngOnInit(): void {
    this.sortedData = this.data.history.slice();
  }

  public sortData(sort: Sort)  {
    const data = this.data.history.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date': return this.compare(a.timestamp, b.timestamp, isAsc);
        case 'price': return this.compare(a.price, b.price, isAsc);
        default: return 0;
      }
    });
  }

  public compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public onSave($event) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.data.history[0]);
    const csv = this.data.history.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], {type: 'text/csv' });
    const history = this.data.history;
    const option = {month: 'short', day: '2-digit'};
    const start = history.length ? new Date (history[0].timestamp).toLocaleString('en-US', option) : '';
    const end = history.length ? new Date (history[history.length - 1].timestamp).toLocaleString('en-US', option) : '';
    saveAs(blob, `${this.data.coin.name} ${start}-${end}.csv`);
  }
}
