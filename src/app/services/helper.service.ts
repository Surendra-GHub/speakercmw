import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { comp } from '../models/components';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  compSubject :Subject<comp> = new Subject<comp>();
}
