import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable, catchError } from 'rxjs';
import { Volume } from '../models/Volume';


export interface ErrorResponse {
    error: {
        code: number;
        message: string;
    }

}

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

    GetVolumeProgress(volumeId: number, accountId: number): Observable<Volume> {
        let body = JSON.stringify({
            volumeId: volumeId,
            accountId: accountId
        })

        let headers = { 'content-type': 'application/json' }

        let data = new Observable<Volume>();


        data = this.http.get<Volume>(`${this.apiUrl}GetVolProgress?accountId=${accountId}&volId=${volumeId}`).pipe(
            (response) => {
                console.log(response);
                return response;
            
            },
            catchError((error) => {
                console.log({GetError: error});

                if (error.status == 404) {
                    console.log('Volume progress not found, creating new progress');
                    this.CreateVolumeProgress(volumeId, accountId, 0).subscribe((response) => {
                        console.log({CreateResponse: response});
                        return response;
                    });
                }
                
                return new Observable<Volume>();
            })        
        ); 


        return data;
    }

    CreateVolumeProgress(volumeId: number, accountId: number, bookId: number) {
        let body = JSON.stringify({
            volumeId: volumeId,
            accountId: accountId,
            bookId: bookId
        })

        let headers = { 'content-type': 'application/json' }

        let data = this.http.post<Volume>(`${this.apiUrl}CreateVolProgress`, body, { 'headers': headers });
        if (!data) return new Observable((observer) => { observer.next(null) });
        return data;
    }

    VerifyVolumeProgress(volumeId: number, accountId: number, bookId: number) {
        this.GetVolumeProgress(volumeId, accountId).subscribe((response: Volume) => {})
      }
}