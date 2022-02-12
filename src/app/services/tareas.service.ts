import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { TareaModel } from '../interfaces/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {


  private url='https://consware-cd7f8-default-rtdb.firebaseio.com';
  constructor( private http: HttpClient) { }

  crearTarea(tarea: TareaModel){
    return this.http.post(`${this.url}/tareas.json`,tarea)
            .pipe(map((resp: any)=>{
              tarea.id= resp.name;
              return tarea;
            }
            ));
  }

  actTarea(tarea: TareaModel){
      const tarTemp ={
        ...tarea
      };
      delete tarTemp.id;
      return this.http.put(`${this.url}/tareas/${tarea.id}.json`,tarTemp);
    }

  getTarea(id: string){
    return this.http.get(`${this.url}/tareas/${id}.json`);
  }

  borrarTarea(id: string){
    return this.http.delete(`${this.url}/tareas/${id}.json`);
  }

  getTareas(){
    return this.http.get(`${this.url}/tareas.json`)
    .pipe(map( this.crearArreglo),
    delay(0)
    );
  }

  private crearArreglo(tareaObj: object | any){
    const tareas: TareaModel[]=[];

    Object.keys(tareaObj).forEach(key => {
      const tarea: TareaModel = tareaObj[key];
      tarea.id=key;
      tareas.push(tarea);
    });
    if(tareaObj===null){return[];};

    return tareas;
  }


}
