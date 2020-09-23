import {Component, Inject, OnInit} from '@angular/core';
import {ConsultantRequest} from '../../../model/consultant/ConsultantResponse';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ConsultantService} from '../../../dao/impl/consultant/consultant.service';
import {DialogAction, DialogResult} from '../../../object/DialogResult';

@Component({
  selector: 'app-add-consultant-dialog',
  templateUrl: './add-consultant-dialog.component.html',
  styleUrls: ['./add-consultant-dialog.component.css']
})
export class AddConsultantDialogComponent implements OnInit {
  loading = false;
  consultant: ConsultantRequest;
  dialogTitle: string;
  constructor(
    private dialogRef: MatDialogRef<AddConsultantDialogComponent>,
    private consultantService: ConsultantService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.title;
    this.consultant = {
      email: '',
      password: ''
    };
  }

  saveConsultant(): void {
    this.loading = true;
    this.consultantService.create(this.consultant).subscribe(
      response => {
        this.dialogRef.close(new DialogResult(DialogAction.OK, response));
        this.toastr.success('Консультант создан');
      },
      error => {
        this.toastr.error(error.message, 'Error');
      },
      () => {
        this.loading = false;
      }
    );
  }

  confirm() {
    this.saveConsultant();
  }

  // нажали отмену
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

}
