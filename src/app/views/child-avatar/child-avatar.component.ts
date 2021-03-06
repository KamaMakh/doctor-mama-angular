import {Component, OnInit} from '@angular/core';
import {GeneralTableView} from '../GeneralTableView';
import {ChildAvatarResponse} from '../../model/childavatar/ChildAvatarResponse';
import {ToastrService} from 'ngx-toastr';
import {ChildAvatarService} from '../../dao/impl/childavatar/child-avatar.service';
import {PageEvent} from '@angular/material/paginator';
import {environment} from '../../../environments/environment.prod';
import {MatDialog} from "@angular/material/dialog";
import {ChildAvatarDialogComponent} from "../../dialog/child-avatar-dialog/child-avatar-dialog.component";
import {DialogAction} from "../../object/DialogResult";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-child-avatar',
  templateUrl: './child-avatar.component.html',
  styleUrls: ['./child-avatar.component.css']
})
export class ChildAvatarComponent extends GeneralTableView<ChildAvatarResponse> implements OnInit {

  url = environment.apiBaseUrl;

  constructor(private toastr: ToastrService,
              private childAvatarService: ChildAvatarService,
              private dialog: MatDialog,) {
    super();
  }

  getImage(path: string): string {
    return this.url + path;
  }

  ngOnInit(): void {
    this.displayedColumns = ['avatar', 'operations'];
    if (!this.items) {
      this.pageSize = 25;
      this.pageNumber = 0;
      this.getAllItems();
    }
  }

  addItem() {
    const dialogRef = this.dialog.open(ChildAvatarDialogComponent, {
      data: ['Добавление аватарки пользователя'], width: '500px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }
      if (result.action === DialogAction.OK) { // нажали сохранить (обрабатывает как добавление, так и удаление)
        this.toastr.info('Добавлена новая аватарка', 'Успех');
        this.getAllItems();
        return;
      }
    });
  }

  getAllItems() {
    this.childAvatarService.findAll(this.pageNumber).subscribe(
      data => {
        this.totalElements = data.totalImagesCount;
        this.items = data.images;
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

  openDeleteDialog(obj: ChildAvatarResponse) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить аватар?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }
      if (result.action === DialogAction.OK) {
        this.childAvatarService.deleteAvatar(obj.id).subscribe(result => {
          this.toastr.info('Аватар удален', 'Успех');
          this.getAllItems();
        }, error1 => {
          this.toastr.error(error1.message, 'Error')
        });
      }
    });
  }


}
