import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(
    private http: HttpClient,
  ) { }

    private URL = 'http://localhost:3000/api';

  getDocumentos() {
    return this.http.get<any>(this.URL + '/documentos');
  }

  getPrivateDocumentos() {
    return this.http.get<any>(this.URL + '/private-documentos');
  }
  
  sendFile(body: FormData):Observable<any>{
    return this.http.post<any>(this.URL + '/upload', body);
  }

  uploadDocument(document: any) {
    return this.http.post<any>(this.URL + '/document', document);
  }

  getDocuments(){
    return this.http.get<any>(this.URL + '/documentos');
  }

  getDocument(id: string){
    console.log(id)
    return this.http.get<any>(this.URL + '/documentos/' + id);
  }

}
