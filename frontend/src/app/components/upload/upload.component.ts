import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  carreras = [{
    id : 0,
    name: 'Selecciona una carrera'
  }];
  selectedCarrera: String = '';

  materias = [{
    id : 0,
    name: 'Selecciona una materia'
  }];
  selectedMateria: String = '';

  document = {
    title: '',
    description: '',
    content: '',
    file: '',
    id_carrera: '',
    id_materia: ''
  }

  usuario: any = {};


  
  constructor(
    private authService: AuthService,
    private router: Router,
    private documentosService: DocumentosService,
    ) { }

  ngOnInit(): void {
    this.carreras = [
      {id: 1, name: 'Ingeniería en Sistemas Computacionales'},
      {id: 2, name: 'Ingeniería en Mecatrónica'},
      {id: 3, name: 'Ingeniería en Gestión Empresarial'},
      {id: 4, name: 'Ingeniería en Energías Renovables'},
      {id: 5, name: 'Ingeniería en Gestión Ambiental'},
      {id: 6, name: 'Ingeniería en Gestión Turística'},
      {id: 7, name: 'Ingeniería en Gestión de la Salud'}
    ];

    this.materias = [
      {id: 1, name: 'Matemáticas'},
      {id: 2, name: 'Física'},
      {id: 3, name: 'Química'},
      {id: 4, name: 'Programación'},
      {id: 5, name: 'Estructura de Datos'},
      {id: 6, name: 'Inglés'},
      {id: 7, name: 'Taller de Investigación'},
      {id: 8, name: 'Taller de Investigación II'}
    ];

    this.authService.getUser()
    .subscribe(
      res => {
        this.usuario = res;
      },
      err => console.log(err)
    )

  }

  fileTmp: any;

  getFile($event: any): void {
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name
    }
  }

  uploadFile() {
    const body = new FormData();
    body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);
    body.append('title', this.document.title);
    body.append('description', this.document.description);
    body.append('content', this.document.content);
    body.append('id_carrera', this.document.id_carrera);
    body.append('id_materia', this.document.id_materia);
    console.log(this.document)
    this.documentosService.sendFile(body)
    .subscribe(res => console.log(res));
  }

  ChangeMateria($event: any) {
    this.selectedMateria = $event.target.value;
    this.document.id_materia = this.selectedMateria.toString();
  }
  ChangeCarrera($event: any) {
    this.selectedCarrera = $event.target.value;
    this.document.id_carrera = this.selectedCarrera.toString();
  }
  

}
