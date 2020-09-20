import {Component, Inject, OnInit} from '@angular/core';
import {UserChangePasswordRequest} from '../../model/user/UserResponse';
import {FormGroup} from '@angular/forms';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../dao/impl/user/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  loading = false;
  user: UserChangePasswordRequest;
  form: FormGroup;
  dialogTitle: string;
  constructor(
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private userService: UserService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.title;
    this.user = this.data.user;
  }

  saveUser(): void {
    this.loading = true;
    this.userService.updatePassword(this.user.id, this.user.newPassword).subscribe(
      response => {
        this.dialogRef.close(new DialogResult(DialogAction.OK, this.user));
        this.toastr.success('Пароль обновлен');
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
    this.saveUser();
  }

  // нажали отмену
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

}
