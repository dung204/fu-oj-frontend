import { ListChecksIcon } from 'lucide-react';

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
import { formatDateTimeOfCurrentLocale, getTranslation } from '@/base/utils';
import { Submission } from '@/modules/submissions/types';

interface SubmissionsTableProps {
  submissions: Submission[];
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  return (
    <Table className='overflow-hidden rounded-lg'>
      <TableHeader>
        <TableRow className='bg-primary/20 hover:bg-primary/30 transition-colors'>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.submissionTime')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.student')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.result')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.exercise')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.time')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.memory')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.language')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* TODO: Render the submissions data */}
        {submissions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7}>
              <SubmissionsTableEmpty />
            </TableCell>
          </TableRow>
        ) : (
          submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>{formatDateTimeOfCurrentLocale(submission.createdTimestamp)}</TableCell>
              <TableCell>
                {submission.user.firstName} {submission.user.lastName}
              </TableCell>
              <TableCell>{submission.verdict}</TableCell>
              <TableCell>{submission.exercise.title}</TableCell>
              <TableCell>{submission.time}</TableCell>
              <TableCell>{submission.memory}</TableCell>
              <TableCell>{submission.language}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function SubmissionsTableEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <ListChecksIcon className='text-muted-foreground/70' />
        </EmptyMedia>
        <EmptyTitle className='text-muted-foreground/70'>
          {getTranslation('modules.submissions.components.SubmissionsTable.noData')}
        </EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}

export function SubmissionsTableSkeleton() {
  return (
    <Table className='overflow-hidden rounded-lg'>
      <TableHeader>
        <TableRow className='bg-primary/20 hover:bg-primary/30 transition-colors'>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.submissionTime')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.student')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.result')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.exercise')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.time')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.memory')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.language')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 20 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: index is fine here, it's static list
          <TableRow key={`exercise-skeleton-${index}`}>
            <TableCell>
              <Skeleton className='h-[1lh] w-[10ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[20ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[4ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[20ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[5ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[5ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[8ch]' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
