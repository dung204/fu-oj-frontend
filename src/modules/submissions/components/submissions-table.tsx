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
import { getTranslation } from '@/base/utils';

// biome-ignore lint/suspicious/noEmptyInterface: the exercises props will be added later
interface SubmissionsTableProps {
  // TODO: uncomment when Submission type is defined
  // submissions: Submission[];
}

export function SubmissionsTable(_: SubmissionsTableProps) {
  return (
    <Table className='overflow-hidden rounded-lg'>
      <TableHeader>
        <TableRow className='bg-primary/20 hover:bg-primary/30 transition-colors'>
          <TableHead>
            {getTranslation('modules.submissions.components.SubmissionsTable.id')}
          </TableHead>
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
        <TableRow>
          <TableCell colSpan={8}>
            <SubmissionsTableEmpty />
          </TableCell>
        </TableRow>
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
            {getTranslation('modules.submissions.components.SubmissionsTable.id')}
          </TableHead>
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
              <Skeleton className='h-[1lh] w-[5ch]' />
            </TableCell>
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
