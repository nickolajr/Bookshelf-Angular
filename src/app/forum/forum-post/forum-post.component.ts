import { Component, Input } from '@angular/core';
import { ForumPost } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.css']
})
export class ForumPostComponent {
  @Input() post!: ForumPost;
}