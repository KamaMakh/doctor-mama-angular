import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogAction, DialogResult} from "../../object/DialogResult";

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


  constructor(  public fb: FormBuilder, private dialogRef: MatDialogRef<ChildAvatarDialogComponent>, // для работы с текущим диалог. окном
                @Inject(MAT_DIALOG_DATA) private data: [string],
                private dialog: MatDialog) {
    this.form = this.fb.group({
      avatar: [null]
    });
  }


  uploadFile(event: any) {
    this.images = [];
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageSrc = event.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);

    console.log(' file ' + file);
    this.images.push(file);

    this.saveImage(this.images);
    
  }


  ngOnInit(): void {
    this.dialogTitle = this.data[0];
  }

  saveImage(images: File[]) {
    // this.isDownloadImage = true;
    // this.productService.addPhoto(images, productId).subscribe(
    //   rs => {
    //     this.productPhotosNow = rs;
    //     this.product.productPhotos = rs;
    //     this.isDownloadImage = false;
    //   });
  }

  confirm() {

  }

  // нажали отмену
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

}
