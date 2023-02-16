import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  documentoId!: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentosService: DocumentosService
  ) { }

  ngOnInit(): void {
    this.documentoId = this.activatedRoute.snapshot.paramMap.get('id');
    this.documentosService.getDocument(this.documentoId)
  }

}
