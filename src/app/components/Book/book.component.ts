import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/Book';
import { BookProgress } from 'src/app/models/BookProgress';
import { Volume } from 'src/app/models/Volume';
import { BookService } from 'src/app/services/book.service';
import { ErrorResponse, VolumeService } from 'src/app/services/volume.service';
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
public bookVolumes: Volume[] = [];

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

toggleVolume(volume: Volume) {
  volume.showdetails = !volume.showdetails;
} 

title:string="";

//it has a DI on the parameter
//this line tells us that we have a prop called service- its a design pattern
constructor(private service:BookService, private volumeService: VolumeService) {}

ngOnInit(): void {
  this.GetBookList();
}

// label changes
Title(event:any){
  this.title=event.target.value;
  console.log(this.title);
}



// Book stuff
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
    window.location.href = '/library';
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


// Volume stuff
GetBookVolumes(bookId: number) {
  this.volumeService.GetBookVolumes(bookId).subscribe((response: any) => {
    console.log(response);
    this.bookVolumes = response;
    
    // Verify volume progress
    this.bookVolumes.forEach((volume: Volume) => {
      this.volumeService.VerifyVolumeProgress(volume.volumeId, parseInt(sessionStorage.getItem('accountId') as string), bookId);
    });
  });
}

CreateBookVolume(bookId: number) {
  const volumeAmount = this.bookVolumes.length;
  if(volumeAmount < 0 || volumeAmount == null) return;
  let volNumber = volumeAmount + 1;
  this.volumeService.CreateBookVolume(bookId, volNumber).subscribe((response: any) => {
    console.log(response);
  });
  
}
deleteBook(bookId:number){
  const accountId = sessionStorage.getItem('accountId');
  if (!accountId) {
    console.log('No accountId found in session storage');
    console.log(accountId);
    return;
  }
  this.service.deleteBookFromLibrary(parseInt(accountId),bookId).subscribe(() => {
    console.log('Book deleted');
    window.location.href = '/library';
  });
}




CreateVolumeProgress(volumeId: number, accountId: number, bookId: number) {
  this.volumeService.CreateVolumeProgress(volumeId, accountId, bookId).subscribe((response: any) => {
    console.log(response);
  });

}
}
