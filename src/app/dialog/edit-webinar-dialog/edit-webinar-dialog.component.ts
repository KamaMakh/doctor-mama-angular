import {Component, Inject, OnInit} from '@angular/core';
import {WebinarRequest} from '../../model/webinar/Webinar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WebinarService} from '../../dao/impl/webinar/webinar.service';
import {ToastrService} from 'ngx-toastr';
import {DialogAction, DialogResult} from '../../object/DialogResult';

@Component({
  selector: 'app-edit-webinar-dialog',
  templateUrl: './edit-webinar-dialog.component.html',
  styleUrls: ['./edit-webinar-dialog.component.css']
})
export class EditWebinarDialogComponent implements OnInit {
  loading = false;
  webinar: WebinarRequest;
  dialogTitle: string;
  constructor(
    private dialogRef: MatDialogRef<EditWebinarDialogComponent>,
    private webinarService: WebinarService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.title;
    this.webinar = this.data.webinar;
  }

  saveWebinar(): void {
    this.loading = true;
    if (this.webinar.id) {
      this.webinarService.edit(this.webinar).subscribe(
        response => {
          this.dialogRef.close(new DialogResult(DialogAction.OK, response));
          this.toastr.success('Вебинар создан');
        },
        error1 => {
          this.toastr.error(error1.message, 'Error');
        },
        () => {
          this.loading = false;
        }
      );
    } else {
      this.webinarService.create(this.webinar).subscribe(
        response => {
          this.dialogRef.close(new DialogResult(DialogAction.OK, response, true));
          this.toastr.success('Вебинар создан');
        },
        error1 => {
          this.toastr.error(error1.message, 'Error');
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  confirm() {
    this.saveWebinar();
  }

  // нажали отмену
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

}
