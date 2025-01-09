import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/Book';
import { Subscription } from 'rxjs';
import { PopularBookDTO } from '../models/PopularBookDTO';

@Component({
  selector: 'app-popular-books',
  templateUrl: './popular-books.component.html',
  styleUrls: ['./popular-books.component.css']
})
export class PopularBooksComponent implements OnInit, OnDestroy {

  popularBooks: Book[] = [];

  activeBookId: number | null = null;
  modalOpen: boolean = false;
  private modalSubscription: Subscription = new Subscription();

  constructor(private bookService: BookService) {
    this.modalSubscription = this.bookService.modalOpen$.subscribe((isOpen) => {
        this.modalOpen = isOpen;
    });
    
    this.bookService.activeBookId$.subscribe((bookId) => {
        this.activeBookId = bookId;
    });
   }
  
   ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
   }

  ngOnInit(): void {
    this.getPopularBooks();
  }

  // Fetch the top 10 books
  getPopularBooks(): void {
    this.bookService.GetMostAddedBooks().subscribe((mostAddedBooks: PopularBookDTO[]) => {
      console.log(mostAddedBooks);
      this.popularBooks = mostAddedBooks.map(dto => ({
        id: dto.BookId,
        title: { english: dto.Title },
        coverImage: {large: dto.coverImageUrl},
        status: '',
        format: '',
        showdetails: false,
      }));
    });
  }
  
    // Toggle the modal for book details
    toggleDetails(book: Book) {
      if (this.modalOpen) return;
      book.showdetails = !book.showdetails;
      if (book.showdetails) {
        this.bookService.openModal(book.id);
      }
    }
    
    closeDetails(book: Book) {
        this.bookService.closeModal();
        book.showdetails = false;
    }

  // Add book to the library (call the AddBook function from the service)
  AddBook(book: Book): void {
    this.bookService.AddBook(book, 1).subscribe(response => {
      console.log('Book added to library');
      this.closeDetails(book);
    });
  }
}