import {Component, OnInit} from '@angular/core';
import {GeneralTableView} from '../GeneralTableView';
import {ChildAvatarResponse} from '../../model/childavatar/ChildAvatarResponse';
import {ToastrService} from 'ngx-toastr';
import {ChildAvatarService} from '../../dao/impl/childavatar/child-avatar.service';
import {PageEvent} from '@angular/material/paginator';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-child-avatar',
  templateUrl: './child-avatar.component.html',
  styleUrls: ['./child-avatar.component.css']
})
export class ChildAvatarComponent extends GeneralTableView<ChildAvatarResponse> implements OnInit {

  url = environment.apiBaseUrl;

  constructor(private toastr: ToastrService,
              private childAvatarService: ChildAvatarService) {
    super();
  }

  getImage(path: string): string {
    return this.url + path;
  }

  ngOnInit(): void {
    this.displayedColumns = ['avatar'];
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
}
