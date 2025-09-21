import { infiniteQueryOptions } from '@tanstack/react-query';

import { postsService } from '../services/posts.service';
import { PostsSearchParams } from '../types';

export const myPostsQueryOptions = (searchParams: Omit<PostsSearchParams, 'page' | 'pageSize'>) =>
  infiniteQueryOptions({
    queryKey: ['posts', 'me', searchParams],
    queryFn: ({ pageParam }) =>
      postsService.getAllPostsOfCurrentUser({ page: pageParam, pageSize: 10, ...searchParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.metadata.pagination.hasNextPage
        ? lastPage.metadata.pagination.currentPage + 1
        : null,
  });
