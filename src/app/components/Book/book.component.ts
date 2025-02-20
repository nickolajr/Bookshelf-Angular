import { Component, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, take } from 'rxjs';
import { environment } from 'src/app/enviroment/enviroment';
import { Book } from 'src/app/models/Book';
import { BookProgress } from 'src/app/models/BookProgress';
import { VolProgress } from 'src/app/models/VolProgress';
import { Volume } from 'src/app/models/Volume';
import { BookService } from 'src/app/services/book.service';
import { ErrorResponse, VolumeService } from 'src/app/services/volume.service';
import { LoginService } from 'src/app/services/login.service';
import { Account } from 'src/app/models/Account';




interface ApiResponse {
    data: {
        Media: Book;
    };
}

interface BookList {
    progress: BookProgress;
    book: Book;
}
declare var particlesJS: any
@Component({
    selector: 'BookInfo',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit, OnDestroy, AfterViewChecked {

    isLoggedIn: boolean = false;
    public booklist: Book[] = [];
    public Library: BookList[] = [];
    public bookVolumes: Volume[] = [];
    public volumeProgressMap: Map<number, VolProgress> = new Map<number, VolProgress>();
    public showModal: boolean = false;
    public account: Account | null = null;
    private accountSubscription: Subscription | undefined;

    toggleDetails(book: Book) {
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

    title: string = "";
    pagesRead: number = 0;
    totalPages: number = 0;


    constructor(
        private service: BookService,
        private volumeService: VolumeService,
        private loginService: LoginService) { }

    ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
      console.log('particles.js loaded...');
    });
        this.accountSubscription = this.loginService.currentUser$
            .pipe(take(1))
            .subscribe({
                next: (account) => {
                    this.account = account;
                    this.isLoggedIn = this.convertToBoolean(this.account?.isLoggedin);
                    console.log("isloggedin" + this.account?.isLoggedin)
                    console.log(this.isLoggedIn)
                    if (this.account?.id) {
                        this.GetBookList(this.account.id);
                    }
                },
                error: (error) => {
                    console.error('Error fetching user account:', error);
                    
                },
            });
    }

    ngAfterViewChecked(): void {
        this.attachVolumeButtonListeners();
    }

    ngOnDestroy(): void {
        this.accountSubscription?.unsubscribe();
    }


    
    Title(event: any) {
        this.title = event.target.value;
        console.log(this.title);
    }

    PagesRead(event: any) {
        this.pagesRead = parseInt(event.target.value);
    }

    TotalPages(event: any) {
        this.totalPages = parseInt(event.target.value);
    }


    // Book stuff
    GetByTitle() {
        this.service.GetByTitle(this.title).subscribe((response: ApiResponse) => {
            const book = response.data.Media;
            this.booklist.push(book);
            console.log(this.booklist);
            console.log(this.booklist[0].title.english);
        });
    }

    AddBook(book: Book) {
        console.log(`AddBook(${book})`)
        if (!this.account?.id) {
            console.log('No user logged in')
            return
        }
        this.service.AddBook(book, parseInt(this.account.id)).subscribe((response: ApiResponse) => {
            window.location.reload();
        });

    }

    GetBookList(accountId: string) {
        console.log(accountId, "listid")
        this.service.GetBookList(accountId).subscribe((response: any) => {
            this.booklist = [];
            this.Library = response;
            console.log(this.booklist);
        });
    }
    private convertToBoolean(value: string | undefined): boolean {
        if (value === "1") {
            return true;
        } else if (value === "0") {
            return false;
        }
        throw new Error(`Invalid value: ${value}. Expected "1" or "0".`);
    }


    // Volume stuff
    GetBookVolumes(bookId: number) {
        this.volumeService.GetBookVolumes(bookId).subscribe((response: any) => {
            this.bookVolumes = response;

            // Verify volume progress
            this.bookVolumes.forEach((volume: Volume) => {
                if (!this.account?.id) {
                    console.log('No user logged in')
                    return
                }
                this.volumeService.VerifyVolumeProgress(volume.volumeId, parseInt(this.account.id), bookId);

                // Get volume progress
                this.volumeService.GetVolumeProgress(volume.volumeId, parseInt(this.account.id)).subscribe((response: VolProgress) => {
                    this.volumeProgressMap.set(response.volId, response);
                });
            });
        });
    }

    CreateBookVolume(bookId: number) {
        const volumeAmount = this.bookVolumes.length;
        if (volumeAmount < 0 || volumeAmount == null) return;
        let volNumber = volumeAmount + 1;
        this.volumeService.CreateBookVolume(bookId, volNumber).subscribe((response: any) => {
            window.location.reload();
        });

    }
    deleteBook(bookId: number) {
        if (!this.account?.id) {
            console.log('No user logged in')
            return;
        }
        this.service.deleteBookFromLibrary(parseInt(this.account.id), bookId).subscribe(() => {
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
        if (!this.account?.id) {
            console.log('No user logged in')
            return;
        }
        this.volumeService.UpdatePagesRead(progress).subscribe((response: any) => {
            window.location.reload();
        });
    }

    UpdateTotalPages(volumeId: number) {
        const progress = this.volumeProgressMap.get(volumeId);
        if (!progress) return;
        if (!this.account?.id) {
            console.log('No user logged in')
            return
        }
        this.volumeService.UpdateTotalPages(progress, this.totalPages).subscribe((response: any) => {
            window.location.reload();
        });
    }

    attachVolumeButtonListeners() {
        setTimeout(() => {
            const volumeElements = document.querySelectorAll('.volume');
            volumeElements.forEach((volumeElement) => {
                const volumeId = (volumeElement as HTMLElement).dataset['volumeId']; // Assuming you have a data attribute on the element

                if (!volumeId) {
                    console.warn("Volume ID not found on volume element.");
                    return;
                }
                const volumeIdNumber = parseInt(volumeId);
                if (isNaN(volumeIdNumber)) {
                    console.warn("Invalid Volume ID number.");
                    return;
                }
                const button = volumeElement.querySelector('.volume-button');

                if (!button) {
                    console.warn("Button not found for volume element with volumeId: " + volumeId);
                    return;
                }

                button.addEventListener('click', () => {
                    volumeElement.classList.toggle('active');
                });
            });
        });
    }

}