import { Component, OnInit, HostListener } from '@angular/core';
import { ForumService, ForumPost, PaginatedResponse } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {
  posts: ForumPost[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  pageSize: number = 16;  // Default page size for PC)
  totalPosts: number = 0;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.updatePageSize();
    this.loadPosts();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updatePageSize();
  }

  updatePageSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) { //phone screen
      this.pageSize = 4;
    } else if (screenWidth < 1200) { //tablet screen
      this.pageSize = 8;
    } else {// pc
      this.pageSize = 16;
    }

    if (this.posts.length > 0) {
      this.loadPosts();
    }
  }

  loadPosts(): void {
    this.loading = true;
    this.forumService.getPosts(this.currentPage, this.pageSize).subscribe((response: PaginatedResponse) => {
      console.log('Posts Response:', response);
      this.posts = response.posts;
      this.totalPosts = response.totalPosts;
      this.totalPages = response.totalPages;
      this.pageNumbers = this.generatePageNumbers();
      this.loading = false;
    });
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadPosts();
    }
  }

  generatePageNumbers(): number[] {
    const numbers: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  getPaginationArray(): number[] {
    let paginationArray: number[] = [];
    if (this.totalPages <= 10) {
      for (let i = 1; i <= this.totalPages; i++) {
        paginationArray.push(i);
      }
    } else {
      if (this.currentPage <= 5) {
        for (let i = 1; i <= 5; i++) {
          paginationArray.push(i);
        }
        paginationArray.push(-1);
        paginationArray.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 4) {
        paginationArray.push(1);
        paginationArray.push(-1);
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
          paginationArray.push(i);
        }
      } else {
        paginationArray.push(1);
        paginationArray.push(-1);
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          paginationArray.push(i);
        }
        paginationArray.push(-1);
        paginationArray.push(this.totalPages);
      }
    }
    return paginationArray;
  }

  isEllipsis(pageNumber: number): boolean {
    return pageNumber === -1;
  }
}