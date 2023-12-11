import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from 'src/app/models/Book';
import { BookProgress } from 'src/app/models/BookProgress';
import { BookService } from 'src/app/services/book.service';
import { VolumeService } from 'src/app/services/volume.service';
interface ApiResponse {
  data: {
    Media: Book;
  };
}

interface BookList {
  progress: BookProgress;
  book: Book;
}

@Component({
  selector: 'BookInfo', 
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

public booklist:Book[]=[];

public Library: BookList[] = [];

public showModal: boolean = false;

toggleDetails(book:Book) {
  if (this.showModal) return;
  book.showdetails = !book.showdetails;
  if (book.showdetails) {
    this.showModal = true;
    this.GetBookVolumes(book.id);
  }
}

closeDetails(book: Book) {
  this.showModal = false;
  this.toggleDetails(book);
}

title:string="";

//it has a DI on the parameter
//this line tells us that we have a prop called service- its a design pattern
constructor(private service:BookService, private volumeService: VolumeService) {}

ngOnInit(): void {
  this.GetBookList();
}

Title(event:any){
  this.title=event.target.value;
  console.log(this.title);

}
GetByTitle(){
  console.log("component");
  this.service.GetByTitle(this.title).subscribe((response: ApiResponse) => {
    console.log(response);
    const book = response.data.Media;
    this.booklist.push(book);
    console.log(this.booklist);
    console.log(this.booklist[0].title.english);
  });
}
AddBook(book: Book){
  console.log(`AddBook(${book})`)
  const accountId = sessionStorage.getItem('accountId');
  if (!accountId) {
    console.log('No accountId found in session storage');
    console.log(accountId);
    return;
  }
  
  let id: number = Number(accountId);
  this.service.AddBook(book, id).subscribe((response: ApiResponse) => {
    console.log(response);
    
  });
}
GetBookList(){
  const accountId = sessionStorage.getItem('accountId');
  if (!accountId) {
    console.log('No accountId found in session storage');
    return;
  }

  this.service.GetBookList(accountId).subscribe((response: any) => {
    console.log(response);
    this.booklist = [];
    this.Library = response;
    console.log(this.booklist);
  });
}

GetBookVolumes(bookId: number) {
  this.volumeService.GetBookVolumes(bookId).subscribe((response: any) => {
    console.log(response);
  });
}

CreateBookVolume(bookId: number, volNum: number) {
  this.volumeService.CreateBookVolume(bookId, volNum).subscribe((response: any) => {
    console.log(response);
  });
}
}
