import {Component, OnInit} from '@angular/core';
import {GeneralTableView} from '../GeneralTableView';
import {UserResponse} from '../../model/user/UserResponse';
import {UserService} from '../../dao/impl/user/user.service';
import {ToastrService} from 'ngx-toastr';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends GeneralTableView<UserResponse> implements OnInit {

  filterEmail: string;

  constructor(private toastr: ToastrService,
              private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.displayedColumns = ['email', 'ownChildCount', 'observedChildCount', 'payments'];
    if (!this.items) {
      this.pageSize = 25;
      this.pageNumber = 0;
      this.getAllItems();
    }
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
