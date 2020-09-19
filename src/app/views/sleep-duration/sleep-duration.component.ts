import {Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {SleepDurationRequest} from '../../model/charts/SleepDuration';
import {MatDialog} from '@angular/material/dialog';
import {DialogAction} from '../../object/DialogResult';
import {ChartFilterDialogComponent} from '../../dialog/chart-filter-dialog/chart-filter-dialog.component';
import {Children} from '../../model/children/Children';
import {ChartService} from '../../dao/impl/chart/chart.service';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-sleep-duration',
  templateUrl: './sleep-duration.component.html',
  styleUrls: ['./sleep-duration.component.css']
})
export class SleepDurationComponent implements OnInit {

  filter: SleepDurationRequest;
  interval: string;
  currentChild: Children;
  loading = false;
  width = 1600;
  minRotation = 0;

  @ViewChild('wrapper')
  chartCanvas: ElementRef<HTMLElement>;

  @ViewChild('myCanvas')
  chart: BaseChartDirective;

  lineChartData: ChartDataSets[] = [
    {data: [], label: ''}
  ];

  lineChartLabels: Label[];

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: 'white'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'white',
          fontSize: 14,
          stepSize: 10,
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white',
          fontSize: 14,
          autoSkip: false,
          maxRotation: 90,
          minRotation: this.minRotation
        },
        barThickness : 30
      }]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: 'transparent',
    },
  ];

  lineChartLegend = true;

  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(
    private dialog: MatDialog,
    private chartService: ChartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const now = new Date();
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - 7);
    this.filter = {
      childId: 1,
      dayPart: 'DAY',
      startDay: pastDate.getDate(),
      startMonth: pastDate.getMonth() + 1,
      startYear: pastDate.getFullYear(),
      endDay: now.getDate(),
      endMonth: now.getMonth() + 1,
      endYear: now.getFullYear()
    };
    this.interval = 'week';
    this.lineChartLabels = this.getDatesBetweenDates(
      `${this.filter.startYear}-${this.filter.startMonth}-${this.filter.startDay}`,
      `${this.filter.endYear}-${this.filter.endMonth}-${this.filter.endDay}`
    );
  }

  setChartWidth(): void {
    const wrapper = document.querySelector('.chart-wrapper');
    if (wrapper !== null && wrapper instanceof HTMLElement) {
      this.width = wrapper.offsetWidth;
    } else {
      this.width = 1600;
    }
  }

  chooseInterval(type: string): void {
    const pastDate = new Date();
    const now = new Date();
    let pastDateData: number;
    switch (type) {
      case 'week': {
        pastDateData = now.getDate() - 7;
        pastDate.setDate(pastDateData);
        break;
      }
      case 'month': {
        pastDateData = now.getMonth() - 1;
        pastDate.setMonth(pastDateData);
        break;
      }
      case 'year': {
        pastDateData = now.getFullYear() - 1;
        pastDate.setFullYear(pastDateData);
        break;
      }
    }
    this.interval = type;
    this.filter.startDay = pastDate.getDate();
    this.filter.startMonth = pastDate.getMonth() + 1;
    this.filter.startYear = pastDate.getFullYear();
    this.filter.endDay = now.getDate();
    this.filter.endMonth = now.getMonth() + 1;
    this.filter.endYear = now.getFullYear();
  }

  setDayPart(data) {
    this.filter.dayPart = data.value;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChartFilterDialogComponent, {
      data: ['Выбор ребенка'], width: '700px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }
      if (result.action === DialogAction.OK) { // нажали сохранить (обрабатывает как добавление, так и удаление)
        this.currentChild = result.obj as Children;
        this.filter.childId = this.currentChild.childId;
        return;
      }
    });
  }

  search(): void {
    this.loading = true;
    this.chartService.getSleepDuration(this.filter).subscribe(
      response => {
        console.log(response);
        this.lineChartLabels = this.getDatesBetweenDates(
          `${this.filter.startYear}-${this.filter.startMonth}-${this.filter.startDay}`,
          `${this.filter.endYear}-${this.filter.endMonth}-${this.filter.endDay}`
        );
        if (this.interval === 'year') {
          this.chartCanvas.nativeElement.style.width = 365 * 30 + 'px';
          this.minRotation = 90;
        } else {
          this.chartCanvas.nativeElement.style.width = '100%';
          this.minRotation = 0;
        }
        const arr = [];
        for (const key in response) {
          if (response[key]) {
            const data = response[key];
            const date = moment.unix(data.date).format(this.interval === 'year' ? 'YYYY/MM/DD' : 'MM/DD');
            arr[this.lineChartLabels.indexOf(date)] = Number(this.filter.dayPart === 'DAY' ? data.maxDaySleeping : this.filter.dayPart === 'NIGHT' ? data.maxNightSleeping : data.maxSummarySleeping);
          }
        }
        this.lineChartData = [];
        this.lineChartData.push({
          data: arr,
          label: this.filter.dayPart === 'DAY' ? 'Дневной сон' : this.filter.dayPart === 'NIGHT' ? 'Ночной сон' : 'Общий сон',
          borderColor: 'white', backgroundColor: 'transparent'
        });
      }, error1 => {
        this.toastr.error(error1.message, 'Error');
      },
      () => {
        this.loading = false;
      }
    );
  }

  getDatesBetweenDates(startDate: string, endDate: string, dateFormat = 'YYYY/MM/DD'): string[] {
    const getDateAsArray = date => {
      return moment(date.split(/\D+/), dateFormat);
    };
    const diff = getDateAsArray(endDate).diff(getDateAsArray(startDate), 'days') + 1;
    const dates = [];
    for (let i = 0; i < diff; i++) {
      const nextDate = getDateAsArray(startDate).add(i, 'day');
      const isWeekEndDay = nextDate.isoWeekday() > 7;
      if (!isWeekEndDay) {
        dates.push(nextDate.format(this.interval === 'year' ? 'YYYY/MM/DD' : 'MM/DD'));
      }
    }
    return dates;
  }

}