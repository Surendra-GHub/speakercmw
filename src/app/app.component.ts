import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HelperService } from './services/helper.service';
import { Subscription } from 'rxjs';
import { comp } from './models/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'speakcore-cmw';
  helperService: HelperService = inject(HelperService);
  comp: comp = comp.login;
  compSubscription:Subscription = new Subscription();
  component = comp;

  ngOnInit(): void {
     this.compSubscription = this.helperService.compSubject.subscribe({
      next: (comp) => {
        this.comp = comp;
      },
    });
  }

  ngOnDestroy(): void {
    this.compSubscription.unsubscribe();
  }
}
