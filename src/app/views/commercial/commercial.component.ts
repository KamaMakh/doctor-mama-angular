import {Component, OnInit} from '@angular/core';
import {CommercialService} from "../../dao/impl/commercial/commercial.service";
import {environment} from "../../../environments/environment.prod";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})
export class CommercialComponent implements OnInit {

  form: FormGroup;
  images: any[] = [];

  idNow: number;
  linkNow: string;
  descriptionNow: string;
  isOnNow: boolean;
  contentTypeNow: string;
  pathNow: string;

  url = environment.apiBaseUrl;

  imageSrc: string;

  currentImage = new Image();

  isDownloadImage = false;

  isFirstLoad = true;

  constructor(private commercialService: CommercialService, public fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group({
      avatar: [null]
    });
  }

  ngOnInit(): void {
    this.getBanner();
  }

  getBanner() {
    this.commercialService.getOne().subscribe(result => {
      this.idNow = result.id;
      this.linkNow = result.link;
      this.descriptionNow = result.description;
      this.isOnNow = result.isOn;
      this.contentTypeNow = result.contentType;
      this.pathNow = result.path;

      if (!this.isFirstLoad) {
        this.currentImage = <HTMLImageElement>document.getElementById('myImage');
        this.currentImage.src = this.getImage(this.pathNow);
      }
      this.isFirstLoad = false;
    }, error1 => {
      this.toastr.error(error1.message, 'Error')
    });

  }

  getImage(path: string): string {
    return this.url + path;
  }

  uploadFile(event: any) {
    this.images = [];

    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = (evt:any) => {

      let img = new Image;
      img.onload = (evt0:any)=> {
        if (img.width === 990 && img.height === 240){
          this.imageSrc = evt.target.result;
          this.images.push(file);
        } else if (img.width === 660 && img.height === 160) {
          this.imageSrc = evt.target.result;
          this.images.push(file);
        } else if (img.width === 330 && img.height === 80) {
          this.imageSrc = evt.target.result;
          this.images.push(file);
        } else {
          this.toastr.error('Размеры баннера должны быть:  330 х 80, 660 х 160, 990 х 240 пикселей!', 'Error');
          this.imageSrc = null;
          this.images = [];
        }
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);

  }

  confirm() {
    this.isDownloadImage = true;
    this.commercialService.updateBanner(this.images, this.linkNow, this.descriptionNow, this.isOnNow).subscribe(result => {
      this.isDownloadImage = false;
      this.imageSrc = null;
      this.images = [];
      this.getBanner();
      this.toastr.info('Баннер сохранен', 'Успех');
    }, error1 => {
      this.isDownloadImage = false;
      this.toastr.error(error1.message, 'Error')
    });


  }


}
