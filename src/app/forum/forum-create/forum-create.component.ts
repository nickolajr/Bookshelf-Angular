import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumService, ForumPost } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum-create',
  templateUrl: './forum-create.component.html',
  styleUrls: ['./forum-create.component.css']
})
export class ForumCreateComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private forumService: ForumService) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      
      const accountId = sessionStorage.getItem('accountId');
      
      if (!accountId) {
        
        console.error('Account ID not found in sessionStorage');
        return;
      }

      const newPost: ForumPost = {
        id: 0,
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        accountId: Number(accountId)  
      };
      console.log(newPost);
      this.forumService.createPost(newPost).subscribe((post) => {
        console.log('Created forum post', post);
        this.postForm.reset();
      });
    }
  }
}
