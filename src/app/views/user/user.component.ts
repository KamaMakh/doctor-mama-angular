import {Component, OnInit} from '@angular/core';
import {GeneralTableView} from '../GeneralTableView';
import {UserResponse} from '../../model/user/UserResponse';
import {UserService} from '../../dao/impl/user/user.service';
import {ToastrService} from 'ngx-toastr';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogAction} from '../../object/DialogResult';
import {EditUserDialogComponent} from '../../dialog/edit-user-dialog/edit-user-dialog.component';
import {DeleteUserDialogComponent} from '../../dialog/delete-user-dialog/delete-user-dialog.component';
import {Router} from '@angular/router';
import {AddUserCommentComponent} from '../../dialog/add-user-comment/add-user-comment.component';

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
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUserDoctorMama') ? JSON.parse(localStorage.getItem('currentUserDoctorMama')) : '';
    const role = currentUser?.roles[0]?.role;
    if (role && role === 'consultant') {
      this.displayedColumns = ['email', 'ownChildCount', 'observedChildCount', 'adminComment'];
    } else {
      this.displayedColumns = ['email', 'ownChildCount', 'observedChildCount', 'payments', 'adminComment', 'actions'];
    }
    if (!this.items) {
      this.pageSize = 25;
      this.pageNumber = 0;
      this.getAllItems();
    }
  }

  openEditDialog(user: UserResponse): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        title: 'Смена пароля',
        user
      },
      width: '600px',
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
  openCommentDialog(user: UserResponse): void {
    const dialogRef = this.dialog.open(AddUserCommentComponent, {
      data: {
        title: 'Добавить комментарий',
        user
      },
      width: '600px',
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
              this.items[key] = result.obj;
              this.assignTableSource();
              return;
            }
          });
        }
        return;
      }
    });
  }

  openDeleteDialog(user: UserResponse): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: {
        title: 'Удаление пользователя',
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

  openChildren(user: UserResponse): void {
    this.router.navigate([`users/${user.id}/children`]);
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
