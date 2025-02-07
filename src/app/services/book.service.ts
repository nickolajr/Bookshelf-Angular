import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable, BehaviorSubject } from 'rxjs';
import { BookProgress } from '../models/BookProgress';

interface ApiResponse {
  data: {
    Media: Book;
  };
}

interface BookListResponse {
  response: [
    progress: BookProgress,
    book: Book,
  ]
}
interface PopularBookDTO {
  bookId: number;
  title: string;
  addCount: number;
  coverImageUrl: string;
}
//decorator
@Injectable({
  providedIn: 'root'
})
//class
export class BookService {
  

  private readonly apiUrl = environment.apiUrl + "Books/";

  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSubject.asObservable();

  private activeBookIdSubject = new BehaviorSubject<number | null>(null);
  activeBookId$ = this.activeBookIdSubject.asObservable();

  constructor(private http:HttpClient) { }
  

  GetByTitle(title: string): Observable<ApiResponse> {
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify(title);
    return this.http.post<ApiResponse>(this.apiUrl + "GetBookByTitle", body,{'headers':headers});
  }
  GetBookList(accountId: string): Observable<BookListResponse> {
    const headers = { 'content-type': 'application/json'} 
    const body = JSON.stringify({ id: accountId });
    return this.http.post<BookListResponse>(this.apiUrl + "GetBookList", body,{'headers':headers});
  }


  AddBook(book: Book, accountId: number): Observable<ApiResponse> {
    const headers = { 'content-type': 'application/json'} 

    const newBook = {
      id: book.id,
      title: book.title.english || book.title.romaji ,
      description: "",
      author: "",
      volumes: 0,
      pages: 0,
      coverImage: book.coverImage.large
    }

    const body = JSON.stringify({ AccountId: accountId, book: newBook });
    return this.http.post<ApiResponse>(this.apiUrl + "DbAddBook", body,{'headers':headers});
  }
  deleteBookFromLibrary(accountId: number, bookId: number) {
    return this.http.delete(`${this.apiUrl}DelBook?accountId=${accountId}&bookId=${bookId}`);
    
  }
  GetMostAddedBooks(top: number = 12): Observable<PopularBookDTO[]> {
    return this.http.get<PopularBookDTO[]>(`${this.apiUrl}MostAddedBooks?top=${top}`);
  }
  
  openModal(bookId: number) {
    this.modalOpenSubject.next(true);
    this.activeBookIdSubject.next(bookId);
  }

  closeModal() {
      this.modalOpenSubject.next(false);
      this.activeBookIdSubject.next(null);
  }

  //observable is somthing that we listen to for data async

}

//connection to sa server happens like this
//cobber => xmlhttprequest => ajax=> and so on