import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentosService } from 'src/app/services/documentos.service';
import { saveAs } from 'file-saver';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [FileService]
})
export class ViewComponent implements OnInit {

  documento: any = {};
  documentoId: any;
  pdfSrc: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentosService: DocumentosService,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.documentoId = this.activatedRoute.snapshot.paramMap.get('id');
    this.documentosService.getDocument(this.documentoId)
    .subscribe(
      res => {
        this.documento = res;
        console.log(res)
        this.pdfSrc = "http://localhost:3000/"+res.file.filename;
      },
      err => console.log(err)
    );
    console.log(this.pdfSrc)
  }

  download() {
    this.fileService.downloadFile(this.documento._id)
    .subscribe(
      res => {
        saveAs(res, this.documento.title);
      },
      err => console.log(err) 
    );
  }
}
