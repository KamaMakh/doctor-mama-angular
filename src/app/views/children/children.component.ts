import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../dao/impl/user/user.service';
import {MatDialog} from '@angular/material/dialog';
import {Children} from '../../model/children/Children';
import {GeneralTableView} from '../GeneralTableView';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildrenService} from '../../dao/impl/children/children.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent extends GeneralTableView<Children> implements OnInit {
  loading = true;
  userId: number;
  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private childrenService: ChildrenService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.displayedColumns = ['id', 'name', 'dateBirth', 'status', 'actions'];
    if (!this.items) {
      this.pageSize = 25;
      this.pageNumber = 0;
      this.getAllChildren();
    }
  }

  getAllChildren() {
    this.loading = true;
    this.childrenService.findByUser(this.pageNumber, this.userId).subscribe(
      response => {
        this.items = response.children;
        this.totalElements = response.totalChildCount;
        this.loading = false;
        this.assignTableSource();
      },
      error1 => {
        this.toastr.error(error1.message, 'Error');
      }
    );
  }
  pageChanged(pageEvent: PageEvent) {
    this.pageNumber = pageEvent.pageIndex;
    this.getAllChildren();
  }
  openEditDialog(child: Children) {}
  openDeleteDialog(child: Children) {}

}
