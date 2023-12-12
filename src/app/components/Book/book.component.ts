import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroment/enviroment';
import { Book } from 'src/app/models/Book';
import { BookProgress } from 'src/app/models/BookProgress';
import { VolProgress } from 'src/app/models/VolProgress';
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

  isLoggedIn: boolean = environment.isLoggedIn;

public booklist:Book[]=[];

public Library: BookList[] = [];
public bookVolumes: Volume[] = [];

// VolumeProgress map
public volumeProgressMap: Map<number, VolProgress> = new Map<number, VolProgress>();

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
pagesRead:number=0;
totalPages:number=0;

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

PagesRead(event: any) {
  this.pagesRead = parseInt(event.target.value);
}
TotalPages(event: any) {
  this.totalPages = parseInt(event.target.value);
}


// Book stuff
GetByTitle(){
  this.service.GetByTitle(this.title).subscribe((response: ApiResponse) => {
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
    return;
  }
  
  let id: number = Number(accountId);
  this.service.AddBook(book, id).subscribe((response: ApiResponse) => {
    window.location.reload();
  });
  
}

GetBookList(){
  const accountId = sessionStorage.getItem('accountId');
  if (!accountId) {
    console.log('No accountId found in session storage');
    return;
  }

  this.service.GetBookList(accountId).subscribe((response: any) => {
    this.booklist = [];
    this.Library = response;
    console.log(this.booklist);
  });
}


// Volume stuff
GetBookVolumes(bookId: number) {
  this.volumeService.GetBookVolumes(bookId).subscribe((response: any) => {
    this.bookVolumes = response;
    
    // Verify volume progress
    this.bookVolumes.forEach((volume: Volume) => {
      this.volumeService.VerifyVolumeProgress(volume.volumeId, parseInt(sessionStorage.getItem('accountId') as string), bookId);

      // Get volume progress
      this.volumeService.GetVolumeProgress(volume.volumeId, parseInt(sessionStorage.getItem('accountId') as string)).subscribe((response: VolProgress) => {
        this.volumeProgressMap.set(response.volId, response);
      });
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
    return;
  }
  this.service.deleteBookFromLibrary(parseInt(accountId),bookId).subscribe(() => {
    console.log('Book deleted');
    window.location.reload();
    
  });
}


GetPagesRead(volumeId: number): number {
  const progress = this.volumeProgressMap.get(volumeId);
  if (!progress) return 0;
  return progress.pagesRead;
}

UpdatePagesRead(volumeId: number) {
  const progress = this.volumeProgressMap.get(volumeId);
  if (!progress) return;
  progress.pagesRead = this.pagesRead;
  this.volumeService.UpdatePagesRead(progress).subscribe((response: any) => {
    window.location.reload();
  });
}

UpdateTotalPages(volumeId: number) {
  const progress = this.volumeProgressMap.get(volumeId);
  if (!progress) return;;
  this.volumeService.UpdateTotalPages(progress, this.totalPages).subscribe((response: any) => {
    window.location.reload();
  });
}
}
