import { Component, inject, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { comp } from '../models/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cmw-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  title: string = 'LOGIN';
  helperService: HelperService = inject(HelperService);
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
      }
    )
  }

  login() {
    if(this.loginForm.invalid){
      alert('Please enter a valid password');
    }
    else{
      this.helperService.compSubject.next(comp.contact);
    }    
  }
}
