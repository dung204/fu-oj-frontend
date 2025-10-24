import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { EyeIcon, LogInIcon, UsersIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent, CardFooter } from '@/base/components/ui/card';
import { Skeleton } from '@/base/components/ui/skeleton';
import { getTranslation } from '@/base/utils';
import { groupsService } from '@/modules/groups/services/groups.service';
import { Group, JoinGroupPayload } from '@/modules/groups/types';
import { UserAvatar, UserAvatarSkeleton } from '@/modules/users/components/user-avatar';

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: triggerJoinCode, isPending: isJoining } = useMutation({
    mutationFn: (payload: JoinGroupPayload) => groupsService.joinGroup(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success(getTranslation('modules.groups.components.GroupCard.joinSuccess'));
      navigate({ to: '/groups/$groupId/dashboard', params: { groupId: group.id } });
    },
  });

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
        <span className='font-semibold text-lg'>{group.name}</span>

        <div className='grid grid-cols-8 gap-y-4 items-center gap-2'>
          <UsersIcon className='col-span-1 justify-self-center' />
          <span className='col-span-7'>
            {getTranslation('modules.groups.components.GroupCard.members', {
              count: group.studentsCount,
            })}
          </span>
          <UserAvatar user={group.owner} className='col-span-1 justify-self-center' />
          <span className='col-span-7'>
            {getTranslation('modules.groups.components.GroupCard.createdBy')}{' '}
            <span className='font-medium'>
              {group.owner.firstName} {group.owner.lastName}
            </span>
          </span>
        </div>
      </CardContent>
      <CardFooter>
        {group.joined ? (
          <Link to='/groups/$groupId/dashboard' params={{ groupId: group.id }} className='w-full'>
            <Button className='w-full' disabled={isJoining}>
              <EyeIcon />
              {getTranslation('modules.groups.components.GroupCard.viewGroup')}
            </Button>
          </Link>
        ) : (
          <Button
            loading={isJoining}
            className='w-full'
            variant='success'
            onClick={() => triggerJoinCode({ code: group.code })}
          >
            <LogInIcon />
            {getTranslation('modules.groups.components.GroupCard.joinGroup')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export function GroupCardSkeleton() {
  return (
    <Card className='overflow-hidden pt-0'>
      <div className='relative h-40 w-full'>
        <Skeleton className='absolute inset-0 h-full w-full rounded-md rounded-b-none' />
      </div>
      <CardContent className='flex flex-col gap-4'>
        <span className='font-semibold text-lg'>
          <Skeleton className='h-lh w-[10ch]' />
        </span>

        <div className='grid grid-cols-8 gap-y-4 items-center gap-2'>
          <UsersIcon className='col-span-1 justify-self-center' />
          <span className='col-span-7'>
            <Skeleton className='h-lh w-[6ch]' />
          </span>
          <UserAvatarSkeleton className='col-span-1 justify-self-center' />
          <span className='col-span-7'>
            <Skeleton className='h-lh w-[12ch]' />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
