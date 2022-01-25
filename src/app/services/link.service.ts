import { Injectable } from '@angular/core';
import {Link} from '../models/link.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  linkData!:Link
  constructor() { }

  
}
