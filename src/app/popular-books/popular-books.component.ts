import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/Book';
import { PopularBookDTO } from '../models/PopularBookDTO';
import { LoginService } from '../services/login.service';
import { Account } from '../models/Account';
import { Subscription } from 'rxjs';

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
    public account: Account | null = null;
    private accountSubscription: Subscription | undefined;
    public isLoggedIn: boolean = false;
    selectedBook: Book | null = null;


    constructor(private bookService: BookService, private loginService: LoginService) {
        this.modalSubscription = this.bookService.modalOpen$.subscribe((isOpen) => {
            this.modalOpen = isOpen;
        });

        this.bookService.activeBookId$.subscribe((bookId) => {
            this.activeBookId = bookId;
        });

    }

    ngOnDestroy(): void {
        this.modalSubscription.unsubscribe();
        if (this.accountSubscription) {
            this.accountSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {

        this.accountSubscription = this.loginService.currentUser$
            .subscribe({
                next: (account) => {
                    this.account = account;
                    this.isLoggedIn = !!this.account;
                },
                error: (error) => {
                    console.error('Error fetching user account:', error);

                },
            });
        this.getPopularBooks();
    }

    // Fetch the top 10 books
    getPopularBooks(): void {
      // Fetch the most added books from the service
      this.bookService.GetMostAddedBooks().subscribe({
        next: (apiResponse: PopularBookDTO[]) => {
          console.log('API Response:', apiResponse); // Debug the API response
    
          // Map the API response to the Book model
          this.popularBooks = apiResponse.map(dto => ({
            id: dto.bookId, // Match the DTO property
            title: { english: dto.title }, // Match the DTO property
            coverImage: { large: dto.coverImageUrl }, // Match the DTO property
            status: '', // Default value
            format: '', // Default value
            showdetails: false, // Default value
          }));
    
          console.log('Mapped Popular Books:', this.popularBooks); // Debug the mapped books
        },
        error: (error) => {
          console.error('Error fetching popular books:', error); // Handle errors
        },
      });
    }

    // Toggle the modal for book details
    toggleDetails(book: Book): void {
        if (this.modalOpen) return;
        this.selectedBook = book;
        this.bookService.openModal(book.id);
    }

    closeDetails(): void {
        this.bookService.closeModal();
        this.selectedBook = null;
    }

    // Add book to the library (call the AddBook function from the service)
    addBook(book: Book): void {
        if (this.account?.id) {
            const accountId = Number(this.account.id);
            if (!isNaN(accountId)) {
                this.bookService.AddBook(book, accountId).subscribe(response => {
                    console.log('Book added to library');
                    this.closeDetails();
                });
            } else {
                console.error('Account ID is not a valid number');
            }
        } else {
          console.log("not logged in")
          alert('Please login to add book to library.')
        }
    }
}