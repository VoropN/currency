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
  public sortedData: HistoryPoint[];
  public showButton = true;

  public ngOnInit(): void {
    this.sortedData = this.data.history.slice();
    if (!this.sortedData.length) {
      this.showButton = false;
    }
  }

  public sortData(sort: Sort): number  {
    const data = this.data.history.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      let compareResult: number;
      switch (sort.active) {
        case 'date':
          compareResult = this.compare(a.timestamp, b.timestamp, isAsc);
          break;
        case 'price':
          compareResult = this.compare(a.price, b.price, isAsc);
          break;
        default: compareResult = 0;
      }

      return compareResult;
    });
  }

  public compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private createCSV(): string {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(this.data.history[0]);
    const csv = this.data.history.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    return csv.join('\r\n');
  }

  private createFileName(): string {
    const history = this.data.history;
    const option = {month: 'short', day: '2-digit'};
    const start = history.length ? new Date (history[0].timestamp).toLocaleString('en-US', option) : '';
    const end = history.length ? new Date (history[history.length - 1].timestamp).toLocaleString('en-US', option) : '';
    return `${this.data.coin.name} ${start}-${end}.csv`;
  }

  public onSave(): void {
    const blob = new Blob([this.createCSV()], {type: 'text/csv' });
    saveAs(blob, this.createFileName());
  }
}
