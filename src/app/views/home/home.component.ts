import { Component, Input, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';
import { TareaModel } from '../../interfaces/tarea.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() tareas: TareaModel[] | undefined;
  tarea: TareaModel= new TareaModel();
   info: TareaModel[]=[];
    cargando=false;

  constructor(private tareaService: TareasService) { }

  ngOnInit(): void {
    this.cargando=true;
    this.tareaService.getTareas().subscribe(resp => {
      this.info=resp;
      this.cargando=false;
    });
  }

  borrarTarea(tarea: TareaModel|any, i: number){
    Swal.fire({
      title: '¿esta seguro?',
      text: 'desea borrar esta Tarea?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then(resp =>{
      if(resp.value){
        this.info.splice(i,1);
    this.tareaService.borrarTarea(tarea.id).subscribe();

      }
    });

  }




}
