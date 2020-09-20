import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {Children, ChildrenResponse} from '../../model/children/Children';
import {ChildrenService} from '../../dao/impl/children/children.service';
import {ToastrService} from 'ngx-toastr';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-chart-filter-dialog',
  templateUrl: './chart-filter-dialog.component.html',
  styleUrls: ['./chart-filter-dialog.component.css']
})
export class ChartFilterDialogComponent implements OnInit {
  dialogTitle: string;
  children: Children[];
  currentChildren: Children;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
  loading = true;
  constructor(
    private dialogRef: MatDialogRef<ChartFilterDialogComponent>,
    private childrenService: ChildrenService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: [string]
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data[0];
    this.pageSize = 25;
    this.pageNumber = 0;
    this.getAllChildren();
  }

  getAllChildren() {
    this.loading = true;
    this.childrenService.findAll(this.pageNumber).subscribe(
response => {
        console.log(response);
        this.children = response.children;
        this.totalElements = response.totalChildCount;
        this.loading = false;
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

  chooseChild(child: Children) {
    this.currentChildren = child;
    this.dialogRef.close(new DialogResult(DialogAction.OK, this.currentChildren));
  }

  // нажали отмену
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

}
