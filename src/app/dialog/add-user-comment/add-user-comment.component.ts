import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../dao/impl/user/user.service';
import {ToastrService} from 'ngx-toastr';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {UserResponse} from '../../model/user/UserResponse';

@Component({
  selector: 'app-add-user-comment',
  templateUrl: './add-user-comment.component.html',
  styleUrls: ['./add-user-comment.component.css']
})
export class AddUserCommentComponent implements OnInit {
  loading = false;
  dialogTitle: string;
  comment: string;
  user: UserResponse;
  constructor(
    private dialogRef: MatDialogRef<AddUserCommentComponent>,
    private userService: UserService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.title;
    this.user = this.data.user;
    this.comment = this.user.adminComment;
  }

  saveComment(): void {
    this.loading = true;
    this.userService.addComment(this.user.id, this.comment).subscribe(
      response => {
        this.dialogRef.close(new DialogResult(DialogAction.OK, response));
        this.toastr.success('Комментарий добавлен');
      },
      error1 => {
        this.toastr.error(error1.message, 'Error');
      },
      () => {
        this.loading = false;
      }
    );
  }

  confirm() {
    this.saveComment();
  }

  // нажали отмену
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

}
