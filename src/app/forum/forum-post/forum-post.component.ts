import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ForumPost, ForumService, Reply, PaginatedReplies } from 'src/app/services/forum.service';
import { Account } from 'src/app/models/Account';
import { LoginService } from 'src/app/services/login.service';
import { AccountService } from 'src/app/services/account.service';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';
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
  private maxLength: number = 150; 

  
  newReplyContent: string = '';
  replies: Reply[] = [];
  repliesLoading: boolean = false;
  repliesCurrentPage: number = 1;
  repliesPageSize: number = 5; 
  repliesTotalPages: number = 0;
  
  public account: Account | null = null;
  private accountSubscription: Subscription | undefined;
  constructor(private forumService: ForumService,private loginService: LoginService,private service: AccountService,) { }
  public isLoggedIn: boolean = false;
  

  ngOnInit(): void {
    this.accountSubscription = this.loginService.currentUser$
      .pipe(take(1))
      .subscribe({
        next: (account) => {
          this.account = account;
          this.isLoggedIn = this.convertToBoolean(this.account?.isLoggedin);
          console.log("isloggedin: " + this.account?.isLoggedin);
          console.log("isLoggedIn: " + this.isLoggedIn);         
        },
        error: (error) => {
          console.error('Error fetching user account:', error);
       
        },
      });
    this.truncateText();
    
  }

  truncateText(): void {
    if (this.post && this.post.content) {
      if (this.post.content.length > this.maxLength) {
        this.truncatedContent = this.post.content.substring(0, this.maxLength) + '...';
        this.isTruncated = true;
      } else {
        this.isTruncated = false;
        this.truncatedContent = this.post.content; 
      }
    }
  }
 


  private convertToBoolean(value: string | undefined): boolean {
    if (value === "1") {
      return true;
    } else if (value === "0") {
      return false;
    }
    throw new Error(`Invalid value: ${value}. Expected "1" or "0".`);
  }
  openModal(): void {
    this.showModal = true;
    this.loadReplies(); 
    document.body.classList.add('modal-open');
    console.log(this.post.id)
  }

  closeModal(): void {
    this.showModal = false;
    document.body.classList.remove('modal-open');
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
      console.warn("Cannot add reply: Missing post, post ID, or reply content."); 
      return;
    }
  
    // Convert account ID from string to number
    const accountId = this.account?.id ? Number(this.account.id) : null;
  
    // Validate the account ID
    if (accountId === null || isNaN(accountId)) {
      console.warn("Cannot add reply: Invalid account ID.");
      return;
    }
  
    // add the reply
    this.forumService.addReply(this.post.id, this.newReplyContent, accountId)
      .subscribe({
        next: () => { 
          this.newReplyContent = '';  
          this.loadReplies(); 
        },
        error: (error) => {
          console.error('Error adding reply:', error); // Log the error
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