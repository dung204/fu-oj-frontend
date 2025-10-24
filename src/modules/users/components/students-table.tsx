import { UserIcon } from 'lucide-react';

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
import { Pagination } from '@/base/types';
import { getTranslation } from '@/base/utils';
import { UserAvatar, UserAvatarSkeleton } from '@/modules/users/components/user-avatar';
import { User } from '@/modules/users/types';

interface StudentsTableProps {
  students: User[];
  pagination: Pagination;
}

export function StudentsTable({ students, pagination }: StudentsTableProps) {
  return (
    <Table className='overflow-hidden rounded-lg'>
      <TableHeader>
        <TableRow className='bg-primary/20 hover:bg-primary/30 transition-colors'>
          <TableHead>
            {getTranslation('modules.users.components.StudentsTable.ordinalNumber')}
          </TableHead>
          <TableHead>{getTranslation('modules.users.components.StudentsTable.student')}</TableHead>
          <TableHead>
            {getTranslation('modules.users.components.StudentsTable.rollNumber')}
          </TableHead>
          <TableHead>{getTranslation('modules.users.components.StudentsTable.accepted')}</TableHead>
          <TableHead>
            {getTranslation('modules.users.components.StudentsTable.submitted')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.length > 0 ? (
          students.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell>
                {(pagination.currentPage - 1) * pagination.pageSize + index + 1}
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <UserAvatar user={student} className='' />
                  <span>
                    {student.firstName} {student.lastName}
                  </span>
                </div>
              </TableCell>
              <TableCell>{student.rollNumber ?? '-'}</TableCell>
              <TableCell>100</TableCell>
              <TableCell>1000</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>
              <StudentsTableEmpty />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function StudentsTableEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <UserIcon className='text-muted-foreground/70' />
        </EmptyMedia>
        <EmptyTitle className='text-muted-foreground/70'>
          {getTranslation('modules.users.components.StudentsTable.noData')}
        </EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}

export function StudentsTableSkeleton() {
  return (
    <Table className='overflow-hidden rounded-lg'>
      <TableHeader>
        <TableRow className='bg-primary/20 hover:bg-primary/30 transition-colors'>
          <TableHead>
            {getTranslation('modules.users.components.StudentsTable.ordinalNumber')}
          </TableHead>
          <TableHead>{getTranslation('modules.users.components.StudentsTable.student')}</TableHead>
          <TableHead>
            {getTranslation('modules.users.components.StudentsTable.rollNumber')}
          </TableHead>
          <TableHead>{getTranslation('modules.users.components.StudentsTable.accepted')}</TableHead>
          <TableHead>
            {getTranslation('modules.users.components.StudentsTable.submitted')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 20 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton rows
          <TableRow key={`students-table-skeleton-row-${index}`}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <UserAvatarSkeleton />
                <Skeleton className='h-lh w-[20ch]' />
              </div>
            </TableCell>
            <TableCell>'-'</TableCell>
            <TableCell>
              <Skeleton className='h-lh w-[5ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-lh w-[5ch]' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
