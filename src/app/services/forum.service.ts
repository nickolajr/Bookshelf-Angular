import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  accountId: number;
  replies?: { id: number, content: string }[];
}

export interface PaginatedResponse {
  totalPosts: number;
  page: number;
  pageSize: number;
  totalPages: number;
  posts: ForumPost[];
}

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private apiUrl = environment.apiUrl + 'forum';

  constructor(private http: HttpClient) {}

  getPosts(page: number = 1, pageSize: number = 10): Observable<PaginatedResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse>(this.apiUrl, { params: params });
  }

  createPost(post: ForumPost): Observable<ForumPost> {
    const postData = {
      ...post,
      replies: []
    };

    return this.http.post<ForumPost>(this.apiUrl, postData);
  }
}