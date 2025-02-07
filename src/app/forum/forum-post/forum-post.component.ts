import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ForumPost } from 'src/app/services/forum.service';

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
  }

  closeModal(): void {
    this.showModal = false;
  }
}