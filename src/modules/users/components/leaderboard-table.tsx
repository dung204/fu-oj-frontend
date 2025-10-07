import { MedalIcon } from 'lucide-react';

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/base/components/ui/empty';
import { Skeleton } from '@/base/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/base/components/ui/table';
import { getTranslation } from '@/base/utils';
import { UserAvatarSkeleton } from '@/modules/users/components/user-avatar';

export function LeaderboardTable() {
  return (
    <Table className='overflow-hidden rounded-lg'>
      <TableHeader>
        <TableRow className='bg-primary/20 hover:bg-primary/30 transition-colors'>
          <TableHead>{getTranslation('modules.users.components.LeaderboardTable.rank')}</TableHead>
          <TableHead>
            {getTranslation('modules.users.components.LeaderboardTable.student')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.users.components.LeaderboardTable.rollNumber')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.users.components.LeaderboardTable.accepted')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.users.components.LeaderboardTable.submitted')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* TODO: Render the leaderboard data */}
        <TableRow>
          <TableCell colSpan={5}>
            <LeaderboardTableEmpty />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function LeaderboardTableEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <MedalIcon className='text-muted-foreground/70' />
        </EmptyMedia>
        <EmptyTitle className='text-muted-foreground/70'>
          {getTranslation('modules.users.components.LeaderboardTable.noData')}
        </EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}

export function LeaderboardTableSkeleton() {
  return (
    <Table className='overflow-hidden rounded-lg'>
      <TableHeader>
        <TableRow className='bg-primary/20 hover:bg-primary/30 transition-colors'>
          <TableHead>{getTranslation('modules.users.components.LeaderboardTable.rank')}</TableHead>
          <TableHead>
            {getTranslation('modules.users.components.LeaderboardTable.student')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.users.components.LeaderboardTable.rollNumber')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.users.components.LeaderboardTable.accepted')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.users.components.LeaderboardTable.submitted')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* TODO: Render the leaderboard data */}
        {Array.from({ length: 20 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: index is fine here, as it's just a static skeleton
          <TableRow key={`leaderboard-table-skeleton-row-${index}`}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <UserAvatarSkeleton />
                <Skeleton className='h-[1lh] w-[15ch]' />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[8ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[4ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[4ch]' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
