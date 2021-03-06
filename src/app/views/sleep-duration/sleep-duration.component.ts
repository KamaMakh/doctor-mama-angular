import {Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {SleepDurationRequest, SleepDurationResponse, SleepDurationResponseTotal} from '../../model/charts/SleepDuration';
import {MatDialog} from '@angular/material/dialog';
import {DialogAction} from '../../object/DialogResult';
import {ChartFilterDialogComponent} from '../../dialog/chart-filter-dialog/chart-filter-dialog.component';
import {Children} from '../../model/children/Children';
import {ChartService} from '../../dao/impl/chart/chart.service';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
import {ChildrenService} from '../../dao/impl/children/children.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sleep-duration',
  templateUrl: './sleep-duration.component.html',
  styleUrls: ['./sleep-duration.component.css']
})
export class SleepDurationComponent implements OnInit {

  filter: SleepDurationRequest;
  interval: string;
  currentChild: Children;
  childAgeWeeks = 0;
  childAgeMonth = 0;
  loading = false;
  width = 1600;
  minRotation = 0;
  childId: number;
  disableChanging: boolean;

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
        fontColor: '#666'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#666',
          fontSize: 14,
          stepSize: 10,
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#666',
          fontSize: 14,
          autoSkip: false,
          maxRotation: 90,
          minRotation: this.minRotation
        },
        barThickness : 30
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return `${data.datasets[0].label}: ${this.timeConvert(data.datasets[0].data[tooltipItem.index])}`;
        }
      }
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: '#9c27b0',
      backgroundColor: 'transparent',
    },
  ];

  lineChartLegend = true;

  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(
    private dialog: MatDialog,
    private chartService: ChartService,
    private childrenService: ChildrenService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.disableChanging = false;
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
    if (this.route.snapshot.paramMap.get('childId')) {
      this.disableChanging = true;
      this.childId = Number(this.route.snapshot.paramMap.get('childId'));
      this.searchChildByID();
      this.search();
    }
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
    if (this.currentChild?.childId) {
      this.search();
    }
  }

  setDayPart(data) {
    this.filter.dayPart = data.value;
    if (this.currentChild?.childId) {
      this.search();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChartFilterDialogComponent, {
      data: ['?????????? ??????????????'], width: '700px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!(result)) { // ???????? ???????????? ?????????????? ????????, ???????????? ???? ??????????
        return;
      }
      if (result.action === DialogAction.OK) { // ???????????? ?????????????????? (???????????????????????? ?????? ????????????????????, ?????? ?? ????????????????)
        this.setChild(result.obj as Children);
        this.filter.childId = this.currentChild.childId;
        return;
      }
    });
  }

  search(): void {
    this.loading = true;
    if (this.filter.dayPart) {
      this.chartService.getSleepDuration(this.filter).subscribe(
        response => {
          this.setAllData(response);
        }, error1 => {
          this.toastr.error(error1.message, 'Error');
        },
        () => {
          this.loading = false;
        }
      );
    } else {
      this.chartService.getSleepDurationTotal(this.filter).subscribe(
        response => {
          this.setAllData(response);
        }, error1 => {
          this.toastr.error(error1.message, 'Error');
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  setAllData(response: SleepDurationResponse | SleepDurationResponseTotal) {
    this.lineChartLabels = this.getDatesBetweenDates(
      `${this.filter.startYear}-${this.filter.startMonth}-${this.filter.startDay}`,
      `${this.filter.endYear}-${this.filter.endMonth}-${this.filter.endDay}`
    );
    if (this.chartCanvas) {
      if (this.interval === 'year') {
        this.chartCanvas.nativeElement.style.width = 365 * 30 + 'px';
        this.minRotation = 90;
      } else {
        this.chartCanvas.nativeElement.style.width = '100%';
        this.minRotation = 0;
      }
    }

    this.lineChartData = [];
    if (this.filter.dayPart) {
      const arr = [];
      for (const key in response) {
        if (response[key]) {
          const data = response[key];
          const date = moment.unix(data.date).format(this.interval === 'year' ? 'YYYY/MM/DD' : 'MM/DD');
          arr[this.lineChartLabels.indexOf(date)] = Number((Number(data.duration) / 60 / 60).toFixed(2));
        }
      }
      this.lineChartData.push({
        data: arr,
        label: this.filter.dayPart === 'DAY' ? '?????????????? ??????' : this.filter.dayPart === 'NIGHT' ? '???????????? ??????' : '?????????? ??????',
        borderColor: 'white', backgroundColor: 'transparent'
      });
    } else {
      const dayArr = [];
      const nightArr = [];
      const allArr = [];
      for (const key in response) {
        if (response[key]) {
          const data = response[key];
          const date = moment.unix(data.date).format(this.interval === 'year' ? 'YYYY/MM/DD' : 'MM/DD');
          dayArr[this.lineChartLabels.indexOf(date)] = Number((Number(data.dayDuration) / 60 / 60).toFixed(2));
          nightArr[this.lineChartLabels.indexOf(date)] = Number((Number(data.nightDuration) / 60 / 60).toFixed(2));
          allArr[this.lineChartLabels.indexOf(date)] = Number((Number(data.totalDuration) / 60 / 60).toFixed(2));
        }
      }
      this.lineChartData.push({
        data: dayArr,
        label: '?????????????? ??????',
        borderColor: 'purple', backgroundColor: 'transparent'
      });
      this.lineChartData.push({
        data: nightArr,
        label: '???????????? ??????',
        borderColor: 'lightblue', backgroundColor: 'transparent'
      });
      this.lineChartData.push({
        data: allArr,
        label: '?????????????????? ??????',
        borderColor: 'lightgrey', backgroundColor: 'transparent'
      });
    }
  }

  setChild(child: Children) {
    this.currentChild = child;
    this.childAgeWeeks = moment(new Date()).diff(this.currentChild.dateBirth, 'weeks');
    this.childAgeMonth = moment(new Date()).diff(this.currentChild.dateBirth, 'month');
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

  timeConvert(hours) {
    const seconds = hours * 60 * 60;
    const formattedHours = Math.floor(moment.duration(seconds, 'seconds').asHours());
    const minutes = Math.floor(moment.duration(seconds, 'seconds').minutes());
    return (formattedHours < 10 ? '0' + formattedHours : formattedHours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
  }

  searchChildByID() {
    this.loading = true;
    this.childrenService.getOne(this.childId).subscribe(
      response => {
        this.setChild(response);
        this.filter.childId = this.currentChild.childId;
        this.search();
      },
      (error) => {
        this.toastr.error('?????????????? ?? ?????????? ?????????????????????????????? ??????', 'Error');
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

}
