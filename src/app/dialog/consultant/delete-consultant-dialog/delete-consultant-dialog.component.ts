import {Component, Inject, OnInit} from '@angular/core';
import {ConsultantResponse} from '../../../model/consultant/ConsultantResponse';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConsultantService} from '../../../dao/impl/consultant/consultant.service';
import {ToastrService} from 'ngx-toastr';
import {DialogAction, DialogResult} from '../../../object/DialogResult';

@Component({
  selector: 'app-delete-consultant-dialog',
  templateUrl: './delete-consultant-dialog.component.html',
  styleUrls: ['./delete-consultant-dialog.component.css']
})
export class DeleteConsultantDialogComponent implements OnInit {
  loading = false;
  consultant: ConsultantResponse;
  dialogTitle: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteConsultantDialogComponent>,
    private consultantService: ConsultantService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.title;
    this.consultant = this.data.consultant;
  }

  deleteUser(): void {
    this.loading = true;
    this.consultantService.delete(this.consultant.id).subscribe(
      response => {
        this.dialogRef.close(new DialogResult(DialogAction.OK, response));
        this.toastr.success('Консультант удален');
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
