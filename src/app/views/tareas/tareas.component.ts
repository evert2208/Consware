import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaModel } from 'src/app/interfaces/tarea.model';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  tarea: TareaModel= new TareaModel();

  constructor(private tareaService: TareasService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: string | any = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this.tareaService.getTarea(id)
      .subscribe((resp: TareaModel| any) => {
        this.tarea=resp;
        this.tarea.id=id;
      })
    }
  }

  guardar(form: NgForm){
    if(form.invalid){
      console.log('formulario invalido');
      Swal.fire({
        title: 'incompleto',
        icon: 'error',
        text: 'por favor llene el formulario completo',
        allowOutsideClick: false
      });
      return;
    }
    Swal.fire({
      title: 'espere',
      icon: 'info',
      text: 'guardando info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.tarea.id) {
      peticion=this.tareaService.actTarea(this.tarea);
    }else{
      peticion=this.tareaService.crearTarea(this.tarea);
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: this.tarea.Titulo,
        text: 'se actualizo correctamente',
        icon: 'success'

      });
    });
  }

}
