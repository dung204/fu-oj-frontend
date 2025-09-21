import { NotFoundRouteProps } from '@tanstack/react-router';
import { FileXIcon } from 'lucide-react';

import { BackButton } from '@/base/components/ui/back-button';
import { getTranslation } from '@/base/utils';

interface PostNotFoundPageProps extends Partial<NotFoundRouteProps> {
  showBackButton?: boolean;
}

export function PostNotFoundPage({ showBackButton }: PostNotFoundPageProps) {
  return (
    <section className='flex flex-col gap-3'>
      {showBackButton && <BackButton />}
      <div className='flex flex-col items-center gap-8'>
        <FileXIcon className='size-40 text-error' />
        <h2 className='font-medium text-3xl'>
          {getTranslation('modules.posts.pages.PostNotFoundPage.title')}
        </h2>
      </div>
    </section>
  );
}
