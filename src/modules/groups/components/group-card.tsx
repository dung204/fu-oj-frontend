import { UsersIcon } from 'lucide-react';

import { Card, CardContent } from '@/base/components/ui/card';
import { getTranslation } from '@/base/utils';
import { UserAvatarSkeleton } from '@/modules/users/components/user-avatar';

export function GroupCard() {
  return (
    <Card className='overflow-hidden pt-0'>
      <div className='relative h-40 w-full'>
        <img
          src='/favicon.svg'
          alt='Group img'
          className='object-contain object-center rounded-md rounded-b-none absolute inset-0'
        />
      </div>
      <CardContent className='flex flex-col gap-4'>
        <span className='font-semibold text-lg'>Group title</span>

        <div className='grid grid-cols-8 gap-y-4 items-center gap-2'>
          <UsersIcon className='col-span-1 justify-self-center' />
          <span className='col-span-7'>
            {getTranslation('modules.groups.components.GroupCard.members', {
              count: Math.floor(Math.random() * (100 - 1) + 1),
            })}
          </span>
          <UserAvatarSkeleton className='col-span-1 justify-self-center' />
          <span className='col-span-7'>
            Created by <span className='font-medium'>Instructor</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
