/*
; ==============================
; Title: create-task-dialog.ts
; Author: Professor Krasso
; Date: 01 April 2021
; Modified By: Brooklyn Hairston
; Description: Create Task Dialog window
; ==============================
*/


import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Item } from '../item.interface';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  /**
   *
   * @param dialogRef
   * @param fb
   */

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  /**
   *@description creates form with three fields, one required of text and two optional fields of dueDate and description
   */
  ngOnInit(): void {

    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
      dueDate: [null],
      description: [null]
    })
  }


  /**
   *@description submits the field values and closes the window
   */
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }

  /**
   *@description closes the dialog window without submitting any values
   */

  cancel() {
    this.dialogRef.close();
  }

}
