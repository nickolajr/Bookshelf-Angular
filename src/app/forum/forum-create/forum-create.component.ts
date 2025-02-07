import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumService, ForumPost } from 'src/app/services/forum.service';
import { Account } from 'src/app/models/Account';
import { Subscription, take  } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-forum-create',
  templateUrl: './forum-create.component.html',
  styleUrls: ['./forum-create.component.css']
})
export class ForumCreateComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private forumService: ForumService,private loginService: LoginService) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
      
    });
    
  }
  public account: Account | null = null;
  private accountSubscription: Subscription | undefined;
  public isLoggedIn: boolean = false;


  onSubmit(): void {
    this.accountSubscription = this.loginService.currentUser$
      .pipe(take(1))
      .subscribe({
        next: (account) => {
          this.account = account;
          this.isLoggedIn = this.loginService.convertToBoolean(this.account?.isLoggedin);
        },
        error: (error) => {
          console.error('Error fetching user account:', error);
          
        },
      });
    if (this.postForm.valid) {
      if (!this.account?.id) {
        
        console.error('Account ID not found in sessionStorage');
        return;
      }

      const newPost: ForumPost = {
        id: 0,
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        accountId: Number(this.account.id),  
        author: String(this.account.userName)
      };
      console.log(newPost);
      this.forumService.createPost(newPost).subscribe((post) => {
        console.log('Created forum post', post);
        this.postForm.reset();
      });
    }
  }
}
