import { Component, OnInit } from '@angular/core';
import {GeneralTableView} from '../GeneralTableView';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {WebinarService} from '../../dao/impl/webinar/webinar.service';
import {WebinarResponse} from '../../model/webinar/Webinar';
import {DialogAction} from '../../object/DialogResult';
import {EditWebinarDialogComponent} from '../../dialog/edit-webinar-dialog/edit-webinar-dialog.component';

@Component({
  selector: 'app-webinars',
  templateUrl: './webinars.component.html',
  styleUrls: ['./webinars.component.css']
})
export class WebinarsComponent extends GeneralTableView<WebinarResponse> implements OnInit {
  loading = true;
  constructor(
    private toastr: ToastrService,
    private webinarService: WebinarService,
    private dialog: MatDialog,
    public router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'name', 'description', 'price', 'actions'];
    if (!this.items) {
      this.pageSize = 25;
      this.pageNumber = 0;
      this.getAllWebinars();
    }
  }

  getAllWebinars() {
    this.loading = true;
    this.webinarService.getAll().subscribe(
      response => {
        this.items = response;
        this.loading = false;
        this.assignTableSource();
      },
      error1 => {
        this.toastr.error(error1.message, 'Error');
      }
    );
  }

  openEditDialog(webinar: WebinarResponse | null): void {
    let data;
    if (webinar !== null) {
      data = {
        id: webinar.webinarId,
        name: webinar.name,
        description: webinar.description,
        url: '',
        price: webinar.price
      };
    } else {
      data = {
        name: '',
        description: '',
        url: '',
        price: 0
      };
    }

    const dialogRef = this.dialog.open(EditWebinarDialogComponent, {
      data: {
        title: webinar !== null ? 'Редактирование вебинара' : 'Добавление вебинара',
        webinar: data
      },
      width: '500px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }
      if (result.action === DialogAction.OK) { // нажали сохранить (обрабатывает как добавление, так и удаление)
        if (result.obj && !result.obj2) {
          this.items.forEach((item, key) => {
            if (item.webinarId === result.obj.id) {
              this.items[key] = result.obj;
            }
          });
        } else if (result.obj) {
          result.obj.webinarId = result.obj.id;
          this.items.push(result.obj);
        }
        this.assignTableSource();
        return;
      }
    });
  }
}
