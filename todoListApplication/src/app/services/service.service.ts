import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    @Inject('apiUrl') private apiUrl:any,
    private http: HttpClient
  ) { }

  getAllTodos(){
    return this.http.get(this.apiUrl + '/todo');
  }

  addTodo(Obj:any){
    return this.http.post(this.apiUrl + '/todo', Obj);
  }

  updateTodo(Obj:any){
    return this.http.put(this.apiUrl + '/todo', Obj);
  }

  removeTodo(id:any) {
    return this.http.delete(this.apiUrl + '/todo/' + id)
  }

}
