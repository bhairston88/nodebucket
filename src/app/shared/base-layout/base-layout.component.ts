/*
; ==============================
; Title: base-layout.component.ts
; Author: Professor Krasso
; Date: 3/19/2021
; Modified By: Brooklyn Hairston
; Description: Base Layout Component
; ==============================
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this.cookieService.deleteAll()
    this.router.navigate(['/session/login']);
  }

}
