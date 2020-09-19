import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {ChildAvatarService} from '../../dao/impl/childavatar/child-avatar.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-child-avatar-dialog',
  templateUrl: './child-avatar-dialog.component.html',
  styleUrls: ['./child-avatar-dialog.component.css']
})
export class ChildAvatarDialogComponent implements OnInit {
  form: FormGroup;

  dialogTitle: string;
  images: File[] = [];

  imageSrc: string;

  isDownloadImage = false;


  constructor(  public fb: FormBuilder, private dialogRef: MatDialogRef<ChildAvatarDialogComponent>, // для работы с текущим диалог. окном
                @Inject(MAT_DIALOG_DATA) private data: [string],
                private dialog: MatDialog, private childAvatarService: ChildAvatarService,
                private toastr: ToastrService, ) {
    this.form = this.fb.group({
      avatar: [null]
    });
  }


  uploadFile(event: any) {
    this.images = [];
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageSrc = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.images.push(file);
  }

  ngOnInit(): void {
    this.dialogTitle = this.data[0];
  }

  saveImage(images: File[]) {
    this.isDownloadImage = true;
    this.childAvatarService.addAvatar(images).subscribe(
      rs => {
        this.isDownloadImage = false;
        this.dialogRef.close(new DialogResult(DialogAction.OK));
      }, error1 => {
        this.toastr.error(error1.message, 'Error');
      });
  }

  confirm() {
    this.saveImage(this.images);
  }

  // нажали отмену
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

}
