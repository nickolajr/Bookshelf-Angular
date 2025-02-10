import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  accountId: number;
  replies?: Reply[];
  author: string;
}

export interface Reply {
  id: number;
  content: string;
  accountId: number;
  username: string; // Add username property
}

export interface PaginatedResponse {
  totalPosts: number;
  page: number;
  pageSize: number;
  totalPages: number;
  posts: ForumPost[];
}

export interface PaginatedReplies {
  totalReplies: number;
  page: number;
  pageSize: number;
  totalPages: number;
  replies: Reply[];
}

export interface addReplyDto {
    content: string;
    accountId: number;
}


@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private apiUrl = environment.apiUrl + 'forum';

  constructor(private http: HttpClient) { }

  getPosts(page: number = 1, pageSize: number = 10): Observable<PaginatedResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse>(this.apiUrl, { params: params });
  }

  getReplies(postId: number, page: number = 1, pageSize: number = 5): Observable<PaginatedReplies> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedReplies>(`${this.apiUrl}/${postId}/replies`, { params: params });
  }

  addReply(postId: number, content: string, accountId: number): Observable<any> {
      const body:addReplyDto = { content, accountId };
    return this.http.post(`${this.apiUrl}/${postId}/replies`, body);
  }

  createPost(post: ForumPost): Observable<ForumPost> {
    const postData = {
      ...post,
      replies: []
    };

    return this.http.post<ForumPost>(this.apiUrl, postData);
  }
}