import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataChart } from '../coins/models/data-chart.model';
import { CoinHistory } from '../coins/models/coin-history.model';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public sortedData: CoinHistory [];

  @Input() public data: DataChart;

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
}
