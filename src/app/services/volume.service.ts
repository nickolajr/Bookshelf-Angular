import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable } from 'rxjs';
import { Volume } from '../models/Volume';


@Injectable({
    providedIn: 'root'
})
export class VolumeService {

    private readonly apiUrl = environment.apiUrl + "Volumes/";
  
    constructor(private http: HttpClient) { }

    GetBookVolumes(bookId: number) {
        let body = JSON.stringify({
            bookId: bookId
        })

        let headers = { 'content-type': 'application/json' }

        let data = this.http.get<Volume[]>(`${this.apiUrl}GetBookVol?BookId=${bookId}`);
        return data;
    }

    CreateBookVolume(bookId: number, volNum: number) {
        let body = JSON.stringify({
            bookId: bookId,
            volNumber: volNum
        })

        let headers = { 'content-type': 'application/json' }

        let data = this.http.post<Volume>(`${this.apiUrl}CreateVol`, body, { 'headers': headers });
        return data;
    }
}