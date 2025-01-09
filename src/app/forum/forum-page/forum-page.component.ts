import { Component, OnInit } from '@angular/core';
import { ForumService, ForumPost } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {
  posts: ForumPost[] = []; // Initialize as an empty array
  loading: boolean = true; // Track loading state

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.forumService.getPosts().subscribe((response: any) => {
      console.log('Posts Response:', response); 
      this.posts = response?.posts || []; 
      this.loading = false; 
    });
  }
  
}
