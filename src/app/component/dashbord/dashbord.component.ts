import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {


  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '' ;

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      // this.taskArr = res;
      //console.log('taskArr :- ',res);
      
    }, err => {
      alert('Unable to get the list of tasks')
    })
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    },err => {
      alert(err);
    })
  }

  editTask(){
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    },err => {
      alert('Failed to Update task')
    })
  }

  deleteTask(etask : Task){
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    },err => {
      alert('Failed to delete task');
    })
  }

}
