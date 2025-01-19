import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { states } from '../data/states';
import { HelperService } from '../services/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { comp } from '../models/components';
import { Contact } from '../models/contact';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cmw-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css',
})
export class ContactInfoComponent implements OnInit, OnDestroy {
  title: string = 'CONTACT INFORMATION';
  states = states;
  helperService = inject(HelperService);
  dataService = inject(DataService);
  dataSubscription = new Subscription();
  contactForm: FormGroup;

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      confirmEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      subscribe: new FormControl(true),
    });
  }

  matchEmails() {
    return (
      this.contactForm.get('email')?.value ===
      this.contactForm.get('confirmEmail')?.value
    );
  }

  formSubmit() {
    if (this.contactForm.invalid) {
      alert(
        'Form has some invalid information. Please verify and submit again'
      );
    } else {
      //console.log(this.contactForm);
      const firstName: string = this.contactForm.value.firstName;
      const lastName: string = this.contactForm.value.lastName;
      const email: string = this.contactForm.value.email;
      const state: string = this.contactForm.value.state;
      const subscribe: boolean = this.contactForm.value.subscribe;
      const contact = new Contact(firstName, lastName, state, email, subscribe);
      this.helperService.compSubject.next(comp.complete);
      console.log(contact);

      /* this.dataSubscription = this.dataService.postData(email,contact).subscribe({
        next:()=>{

        },
        complete:()=>{
          this.helperService.compSubject.next(comp.complete);
        }
      }); */
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
