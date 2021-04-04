/*
; ==============================
; Title: task.service.ts
; Author: Professor Krasso
; Date: 29 March 2021
; Modified By: Brooklyn Hairston
; Description: Task service that handles all API calls
; ==============================
*/

//import statements
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

   /**
    * @param empId String for the employee
    * @returns An Observable of type any
    * @returns A http get request with the URL path as the parameter
    */
   findAllTasks(empId: string): Observable<any> {
     return this.http.get('/api/employees/' + empId + '/tasks')
   }


    /**
     *
     * @param empId String for the employee
     * @param task String for the item
     * @returns an Observable of type any
     * @returns A http post request with the URL path as the parameter and then passes in the text set to task
     */
    createTask({ empId, task, date, words }: { empId: string; task: string; date: string; words: string; }): Observable<any> {
      return this.http.post('/api/employees/' + empId + '/tasks', {
        text: task,
        dueDate: date,
        description: words
      })
    }


     /**
      *
      * @param empId String for the employee
      * @param todo Item array
      * @param done Item array
      * @returns An Observable of type any
      * @returns A put request with a URL path as the parameter that passes in the todo and done arrays
      */
     updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {
       return this.http.put('/api/employees/' + empId + '/tasks', {
         todo,
         done
       })
     }


      /**
       *
       * @param empId String for the employee
       * @param taskId String for the item
       * @returns An Observable of type any
       * @returns A http delete request with a URL path as the parameter
       */
      deleteTask(empId: string, taskId: string): Observable<any> {
        return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
      }
   }
