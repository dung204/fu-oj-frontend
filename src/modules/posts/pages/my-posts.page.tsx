import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getTranslation } from '@/base/utils';

import { PostCard, PostCardSkeleton } from '../components/post-card';
import { PostSearchBox } from '../components/post-search-box';
import { PostsSearchParams } from '../types';
import { myPostsQueryOptions } from '../utils/my-posts-query-options.util';

import { PostNotFoundPage } from './post-not-found.page';

interface MyPostsPageProps {
  searchParams: Omit<PostsSearchParams, 'page' | 'pageSize' | 'user'>;
}

export function MyPostsPage({ searchParams }: MyPostsPageProps) {
  const { inView, ref } = useInView();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    myPostsQueryOptions(searchParams)
  );

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage, hasNextPage]);

  const posts = data.pages.flatMap((page) => page.data ?? []);

  return (
    <section className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h2 className='font-medium text-xl'>
          {getTranslation('modules.posts.pages.MyPostsPage.title')}
        </h2>
        <PostSearchBox
          key={`title=${searchParams.title}`}
          value={searchParams.title}
          className='w-1/2'
        />
      </div>
      <div className='flex flex-col gap-4'>
        {!hasNextPage && posts.length === 0 && <PostNotFoundPage />}
        {posts.map((post) => (
          <Link key={post.id} to={`/posts/$postId`} params={{ postId: post.id }}>
            <PostCard post={post} showStatus />
          </Link>
        ))}
        {hasNextPage && (
          <div>
            <PostCardSkeleton />
            <div ref={ref}></div>
          </div>
        )}
      </div>
    </section>
  );
}

export function MyPostsPageSkeleton({ searchParams }: MyPostsPageProps) {
  return (
    <section className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h2 className='font-medium text-xl'>
          {getTranslation('modules.posts.pages.MyPostsPage.title')}
        </h2>
        <PostSearchBox
          key={`title=${searchParams.title}`}
          value={searchParams.title}
          className='w-1/2'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </section>
  );
}
