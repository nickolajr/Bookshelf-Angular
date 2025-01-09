import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  accountId: number;
  replies?: { id: number, content: string }[]; // Add replies as an optional field
}

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private apiUrl = environment.apiUrl + 'forum';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<ForumPost[]> {
    return this.http.get<ForumPost[]>(this.apiUrl);
  }

  createPost(post: ForumPost): Observable<ForumPost> {
    
    const postData = {
      ...post,        // Spread the existing post data
      replies: []     
    };
    
    return this.http.post<ForumPost>(this.apiUrl, postData);
  }
}
