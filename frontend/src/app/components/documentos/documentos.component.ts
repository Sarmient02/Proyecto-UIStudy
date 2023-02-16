import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../../services/documentos.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  documentos: any = [];

  constructor(
    private documentosService: DocumentosService
  ) { }

  ngOnInit(): void {
    this.documentosService.getDocumentos()
    .subscribe(
      res => {
        this.documentos = res;
      },
      err => console.log(err)
    )}


}
