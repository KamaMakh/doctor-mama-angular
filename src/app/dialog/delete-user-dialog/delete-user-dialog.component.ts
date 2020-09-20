import {Component, Inject, OnInit} from '@angular/core';
import {UserResponse} from '../../model/user/UserResponse';
import {FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../dao/impl/user/user.service';
import {ToastrService} from 'ngx-toastr';
import {DialogAction, DialogResult} from '../../object/DialogResult';

@Component({
  selector: 'app-delete-ser-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {
  loading = false;
  user: UserResponse;
  form: FormGroup;
  dialogTitle: string;
  constructor(
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private userService: UserService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.title;
    this.user = this.data.user;
  }

  deleteUser(): void {
    this.loading = true;
    this.userService.delete(this.user.id).subscribe(
      response => {
        this.dialogRef.close(new DialogResult(DialogAction.OK, response));
        this.toastr.success('Пользователь удален');
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
    this.deleteUser();
  }

  // нажали отмену
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

}
