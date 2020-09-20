import {Component, OnInit} from '@angular/core';
import {GeneralTableView} from '../GeneralTableView';
import {UserResponse} from '../../model/user/UserResponse';
import {UserService} from '../../dao/impl/user/user.service';
import {ToastrService} from 'ngx-toastr';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogAction} from '../../object/DialogResult';
import {Children} from '../../model/children/Children';
import {EditUserDialogComponent} from '../../dialog/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends GeneralTableView<UserResponse> implements OnInit {

  filterEmail: string;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.displayedColumns = ['email', 'ownChildCount', 'observedChildCount', 'payments', 'actions'];
    if (!this.items) {
      this.pageSize = 25;
      this.pageNumber = 0;
      this.getAllItems();
    }
  }

  openDialog(user: UserResponse): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        title: 'Смена пароля',
        user
      },
      width: '500px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }
      if (result.action === DialogAction.OK) { // нажали сохранить (обрабатывает как добавление, так и удаление)
        return;
      }
    });
  }

  assignTableSource() {
    return super.assignTableSource();
  }

  getAllItems() {
    this.userService.findAll(this.pageNumber, this.filterEmail).subscribe(
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

  search() {
    this.pageNumber = 0;
    this.getAllItems();
  }
}
