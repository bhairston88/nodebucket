/*
; ==============================
; Title: employee.interface.ts
; Author: Professor Krasso
; Date: 29 March 2021
; Modified By: Brooklyn Hairston
; Description: Employee interface
; ==============================
*/


/* import Item interface */
import { Item } from './item.interface';

/* export employee interface */
export interface Employee {
  empId: string;
  todo: Item [];
  done: Item [];
}
