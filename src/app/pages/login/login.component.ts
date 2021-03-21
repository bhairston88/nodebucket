/*
; ==============================
; Title: login.component.ts
; Author: Professor Krasso
; Date: 3/19/2021
; Modified By: Brooklyn Hairston
; Description: Login Component
; ==============================
*/

//import statements
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  errorMessage: string;

  /**
   *
   * @param fb
   * @param router
   * @param cookieService
   * @param http
   * @param snackBar
   * @description Creates a login form where a value must be entered and that will only accept a numerical value
   */
  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private http: HttpClient, private snackBar: MatSnackBar  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
  }

  /**
   * @description a login form that must accept a valid empId or returns an error message
   */
  login() {
    const empId = this.loginForm.controls['empId'].value;
    console.log(empId);

    this.http.get('/api/employees/' + empId).subscribe(res => {
      if (res['data']) {
        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/']);
      }
      else if (!(res['data']) && (res['httpCode'] === '200'))
      {
        this.openSnackBar('Invalid employeeId, please try again', 'WARNING');
      }
      else {
        this.errorMessage = (res['message'], 'ERROR');
      }
    })
  }

  /**
   *
   * @param message
   * @param notificationType
   * @description opens a snackbar that displays the error message
   */
  openSnackBar(message: string, notificationType: string) : void
  {
    this.snackBar.open(message, notificationType, {
      duration: 3000,
      verticalPosition: 'top'
    })
  }
}
