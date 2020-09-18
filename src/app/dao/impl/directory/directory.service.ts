import { Injectable } from '@angular/core';
import {DirectoryDao} from '../../interface/directory/DirectoryDao';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService implements DirectoryDao{

  constructor() { }
}
