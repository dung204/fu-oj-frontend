import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, Outlet } from '@tanstack/react-router';
import { GripIcon, HomeIcon, UsersIcon } from 'lucide-react';

import { Card, CardContent } from '@/base/components/ui/card';
import { getTranslation } from '@/base/utils';
import { groupsService } from '@/modules/groups/services/groups.service';

interface GroupDetailsPageProps {
  groupId: string;
}

export function GroupDetailsPage({ groupId }: GroupDetailsPageProps) {
  const {
    data: { data: group },
  } = useSuspenseQuery({
    queryKey: ['groups', { id: groupId }],
    queryFn: () => groupsService.getGroupById(groupId),
  });

  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>{group.name}</h1>
        <hr className='border-b border-border' />
        <section>
          <div className='flex justify-between'>
            <nav className='flex'>
              <Link
                to='/groups/$groupId/dashboard'
                params={{ groupId }}
                className='flex items-center gap-2 px-4 py-3 rounded-t-xl border border-b-0 shadow-sm z-10 relative font-medium cursor-pointer'
                activeProps={{
                  className: 'bg-primary text-white border-primary',
                }}
              >
                <HomeIcon />
                {getTranslation('modules.groups.pages.GroupDetailsPage.dashboard')}
              </Link>
              <Link
                to='/groups/$groupId/exercises'
                params={{ groupId }}
                className='flex items-center gap-2 px-4 py-3 rounded-t-xl border border-b-0 shadow-sm z-10 relative font-medium cursor-pointer'
                activeProps={{
                  className: 'bg-primary text-white border-primary',
                }}
              >
                <GripIcon />
                {getTranslation('modules.groups.pages.GroupDetailsPage.exercises')}
              </Link>
              <Link
                to='/groups/$groupId/students'
                params={{ groupId }}
                className='flex items-center gap-2 px-4 py-3 rounded-t-xl border border-b-0 shadow-sm z-10 relative font-medium cursor-pointer'
                activeProps={{
                  className: 'bg-primary text-white border-primary',
                }}
              >
                <UsersIcon />
                {getTranslation('modules.groups.pages.GroupDetailsPage.students')}
              </Link>
            </nav>
          </div>
          <Card className='z-20 relative rounded-tl-none'>
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        </section>
      </section>
      <section className='col-span-1 flex flex-col gap-4'>
        <Card>
          <CardContent></CardContent>
        </Card>
      </section>
    </div>
  );
}

export function GroupDetailsPageSkeleton() {
  return <></>;
}
