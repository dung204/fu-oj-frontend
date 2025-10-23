import { Link } from '@tanstack/react-router';
import { UsersIcon } from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/base/components/ui/empty';
import { getTranslation } from '@/base/utils';

export function GroupNotFoundPage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon' className='size-40'>
          <UsersIcon className='size-1/2' />
        </EmptyMedia>
        <EmptyTitle>{getTranslation('modules.groups.pages.GroupNotFoundPage.title')}</EmptyTitle>
        <EmptyDescription>
          {getTranslation('modules.groups.pages.GroupNotFoundPage.description')}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to='/groups' search={{ tab: 'mine' }}>
          <Button>
            {getTranslation('modules.groups.pages.GroupNotFoundPage.backToGroupsPage')}
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
