import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable } from 'rxjs';

interface ApiResponse {
  data: {
    Media: Book;
  };
}
//decorator
@Injectable({
  providedIn: 'root'
})
//class
export class BookService {
  

  private readonly apiUrl = environment.apiUrl + "Books/";
  constructor(private http:HttpClient) { }
  

  GetByTitle(title: string): Observable<ApiResponse> {
    console.log("getbytitle");
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify(title);
    console.log(body);
    let data = this.http.post<ApiResponse>(this.apiUrl + "GetBookByTitle", body,{'headers':headers});
    data.subscribe(data => {
      console.log(data);
      
    }, error => {console.log(error);});
    return data;
  }
  GetBookList(accountId: string): Observable<ApiResponse> {
    console.log("getbooklist");
    const headers = { 'content-type': 'application/json'} 
    const body = JSON.stringify({ id: accountId });
    console.log(body);
    let data = this.http.post<ApiResponse>(this.apiUrl + "GetBookList", body,{'headers':headers});
    data.subscribe(data => {
      console.log(data);
    }, error => {console.log(error);});
    return data;
  }


  Addbook(book: Book, accountId: number): Observable<ApiResponse> {
    console.log("addbook");
    const headers = { 'content-type': 'application/json'} 

    const newBook = {
      id: book.id,
      title: book.title.english || book.title.romaji ,
      description: "",
      author: "",
      volumes: 0,
      pages: 0,
      coverImg: book.coverImage.large
    }

    const body = JSON.stringify({ AccountId: accountId, Book: newBook });
    console.log(body);
    let data = this.http.post<ApiResponse>(this.apiUrl + "DbAddBook", body,{'headers':headers});
    data.subscribe(data => {
      console.log(data);
      
    }, error => {console.log(error);});
    return data;
  }
  

  //observable is somthing that we listen to for data async

}

//connection to sa server happens like this
//cobber => xmlhttprequest => ajax=> and so on