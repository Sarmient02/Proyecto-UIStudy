import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  documento: any = {};
  documentoId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentosService: DocumentosService
  ) { }

  ngOnInit(): void {
    this.documentoId = this.activatedRoute.snapshot.paramMap.get('id');
    this.documentosService.getDocument(this.documentoId)
    .subscribe(
      res => {
        this.documento = res;
      },
      err => console.log(err)
    );
    console.log(this.documento)
  }

}
