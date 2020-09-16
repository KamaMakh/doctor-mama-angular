import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';

export abstract class GeneralTableView<T> {

  totalElements: number;
  pageNumber: number;
  pageSize: number;
  displayedColumns: string[];

  items: T[];

  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  constructor() {
  }

  assignTableSource() {
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.items; // обновить источник данных (т.к. данные массива tasks обновились)
  }

  getAllItems() {}

  addItem() {
  }

  pageChanged(pageEvent: PageEvent) {
  }

  openEditDialog(cat: T) {
  }
}
