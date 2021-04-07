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
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrls: ['./update-task-dialog.component.css']
})

export class UpdateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<UpdateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: "",
      dueDate: "",
      description: ""
    })
    }

  updateTask() {
    this.dialogRef.close(this.taskForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
