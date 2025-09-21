import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';

import { CreatePostSchema, Post, PostsSearchParams, UpdatePostSchema } from '../types';

class PostsService extends HttpClient {
  public getAllPublicPosts(params?: PostsSearchParams) {
    return this.get<SuccessResponse<Post[]>>('/posts', {
      params,
    });
  }

  public getAllPostsOfCurrentUser(params?: PostsSearchParams) {
    return this.get<SuccessResponse<Post[]>>('/me/posts', {
      params,
      isPrivateRoute: true,
    });
  }

  public createPost(payload: CreatePostSchema) {
    return this.post<SuccessResponse<Post>>('/posts', payload, { isPrivateRoute: true });
  }

  public getPostById(id: string, fetchWithUser?: boolean) {
    return this.get<SuccessResponse<Post>>(`/posts/${id}`, {
      isPrivateRoute: fetchWithUser,
    });
  }

  public updatePost(id: string, payload: UpdatePostSchema) {
    return this.patch<SuccessResponse<Post>>(`/posts/${id}`, payload, {
      isPrivateRoute: true,
    });
  }

  public deletePost(id: string) {
    return this.delete<void>(`/posts/${id}`, {
      isPrivateRoute: true,
    });
  }

  public restorePost(id: string) {
    return this.patch<SuccessResponse<Post>>(
      `/posts/restore/${id}`,
      {},
      {
        isPrivateRoute: true,
      }
    );
  }
}

export const postsService = new PostsService();
