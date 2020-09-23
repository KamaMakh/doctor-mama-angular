import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ConsultantService} from '../../dao/impl/consultant/consultant.service';
import {GeneralTableView} from '../GeneralTableView';
import {UserResponse} from '../../model/user/UserResponse';
import {ConsultantResponse} from '../../model/consultant/ConsultantResponse';
import {PageEvent} from '@angular/material/paginator';
import {EditWebinarDialogComponent} from '../../dialog/edit-webinar-dialog/edit-webinar-dialog.component';
import {DialogAction} from '../../object/DialogResult';
import {AddConsultantDialogComponent} from '../../dialog/consultant/add-consultant-dialog/add-consultant-dialog.component';
import {DeleteUserDialogComponent} from '../../dialog/delete-user-dialog/delete-user-dialog.component';
import {DeleteConsultantDialogComponent} from '../../dialog/consultant/delete-consultant-dialog/delete-consultant-dialog.component';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent extends GeneralTableView<ConsultantResponse> implements OnInit {

  constructor(
    private toastr: ToastrService,
    private consultantService: ConsultantService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'email', 'actions'];
    if (!this.items) {
      this.pageSize = 25;
      this.pageNumber = 0;
      this.getAllItems();
    }
  }

  openDeleteDialog(consultant: ConsultantResponse): void {
    const dialogRef = this.dialog.open(DeleteConsultantDialogComponent, {
      data: {
        title: 'Удаление консультанта',
        consultant
      },
      width: '500px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }
      if (result.action === DialogAction.OK) { // нажали сохранить (обрабатывает как добавление, так и удаление)
        if (result.obj) {
          this.items.forEach((item, key) => {
            if (Number(item.id) === Number(result.obj.id)) {
              this.items.splice(key, 1);
              this.assignTableSource();
              return;
            }
          });
        }
        return;
      }
    });
  }
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AddConsultantDialogComponent, {
      data: {
        title: 'Добавление'
      },
      width: '500px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }
      if (result.action === DialogAction.OK) { // нажали сохранить (обрабатывает как добавление, так и удаление)
        this.items.push(result.obj);
        this.assignTableSource();
        return;
      }
    });
  }

  getAllItems() {
    this.consultantService.findAll(this.pageNumber).subscribe(
      data => {
        this.totalElements = data.totalUsersCount;
        this.items = data.users;
        this.assignTableSource();
      },
      error => {
        this.toastr.error(error.error.message, 'Error');
      });
  }

  pageChanged(pageEvent: PageEvent) {
    this.pageNumber = pageEvent.pageIndex;
    this.getAllItems();
  }

}
