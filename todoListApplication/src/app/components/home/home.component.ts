import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'rxjs/internal/config';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

constructor(
  private serviceService: ServiceService,
  public snackBar : MatSnackBar 
  ) { }  

  ngOnInit(){
    this.getAllTodos();
  }

  data:any= {};

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.updateTodo();
  }

  getAllTodos(){
    this.serviceService.getAllTodos()
    .subscribe((res:any) => {
      Object.keys(res).forEach((key) =>{
        this.data[key]=res[key];
      });
    }, (err) => {
      console.log(err);
    })
  }

  addTodo(todo:any){
    const obj ={todo:todo.value};
    this.serviceService.addTodo(obj)
    .subscribe((res: any)=> {
     this.openSnackBar(res.message);
      this.getAllTodos();
      todo.value='';
    }, (err) => {
      console.log(err);
    });
  }

  updateTodo(){
    this.serviceService.updateTodo(this.data)
    .subscribe( (res:any) => {
      this.openSnackBar(res.message);
    }, (err) =>{
      console.log(err);
    });
  }

  removeTodo(id:any){
    if(confirm('Bu maddeyi silmek istediğinize emin misiniz?')){
    this.serviceService.removeTodo(id)
    .subscribe((res:any) => {
      this.openSnackBar(res.message);
      this.getAllTodos();
    }, (err) => {
      console.log(err);
    });
   }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Tamam');
  }

}
