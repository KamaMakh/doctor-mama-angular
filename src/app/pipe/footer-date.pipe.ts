import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'footerDate'
})
export class FooterDatePipe extends DatePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string { // mediumDate - форматирование по-умолчанию

    if (date == null) {
      return 'Без срока';
    }

    date = new Date(date);

    return new DatePipe('ru-RU').transform(date, format); // показывать дату в нужной локали
  }

}
