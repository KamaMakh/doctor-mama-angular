import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  url = environment.apiBaseUrl;

  directories: string[] = ['Типы активности', 'Ассоциации на засыпание', 'Подготовка ко сну', 'Вид кормления', 'Вид ВБ', 'Нормы сна', 'Нормы ночных кормлений', 'Скачки роста', 'Примеры спокойного ВБ'];

  constructor(private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

}
