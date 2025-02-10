import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ForumPost, ForumService, Reply, PaginatedReplies } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.css']
})
export class ForumPostComponent implements OnInit {
  @Input() post!: ForumPost;
  @ViewChild('content', { static: true }) modalContent!: TemplateRef<any>;

  isTruncated: boolean = false;
  truncatedContent: string = '';
  showModal: boolean = false;
  private maxLength: number = 150; // Adjust the max length as needed

  // Reply Properties
  newReplyContent: string = '';
  replies: Reply[] = [];
  repliesLoading: boolean = false;
  repliesCurrentPage: number = 1;
  repliesPageSize: number = 5; // Adjust page size as needed
  repliesTotalPages: number = 0;
  accountId: number = 1; // Replace with your actual account ID logic

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.truncateText();
  }

  truncateText(): void {
    if (this.post && this.post.content) {
      if (this.post.content.length > this.maxLength) {
        this.truncatedContent = this.post.content.substring(0, this.maxLength) + '...';
        this.isTruncated = true;
      } else {
        this.isTruncated = false;
        this.truncatedContent = this.post.content; // Set truncatedContent to the full content
      }
    }
  }

  openModal(): void {
    this.showModal = true;
    this.loadReplies();  // Load replies when modal opens
    console.log(this.post.id)
  }

  closeModal(): void {
    this.showModal = false;
  }

  loadReplies(): void {
    if (!this.post || !this.post.id) return;

    this.repliesLoading = true;
    this.forumService.getReplies(this.post.id, this.repliesCurrentPage, this.repliesPageSize)
      .subscribe((response: PaginatedReplies) => {
        this.replies = response.replies;
        this.repliesTotalPages = response.totalPages;
        this.repliesLoading = false;
      });
  }

   addReply(): void {
    if (!this.post || !this.post.id || !this.newReplyContent) {
      console.warn("Cannot add reply: Missing post, post ID, or reply content."); // Log the error
      return;
    }
  
    this.forumService.addReply(this.post.id, this.newReplyContent, this.accountId)
      .subscribe({
        next: () => { // Use named parameters
          this.newReplyContent = '';  // Clear input
          this.loadReplies(); // Reload replies
        },
        error: (error) => {
          console.error('Error adding reply:', error); // Log the error
          // Optionally display an error message to the user
        }
      });
  }

  goToRepliesPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.repliesTotalPages) {
      this.repliesCurrentPage = pageNumber;
      this.loadReplies();
    }
  }
}