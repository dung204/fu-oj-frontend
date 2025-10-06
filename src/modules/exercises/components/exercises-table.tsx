import { InboxIcon } from 'lucide-react';

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
interface ExercisesTableProps {
  // TODO: uncomment when Exercise type is defined
  // exercises: Exercise[];
}

export function ExercisesTable(_: ExercisesTableProps) {
  return (
    <Table className='overflow-hidden rounded-lg'>
      <TableHeader>
        <TableRow className='bg-primary/20 hover:bg-primary/30 transition-colors'>
          <TableHead>
            {getTranslation('modules.exercises.components.ExercisesTable.code')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.exercises.components.ExercisesTable.title')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.exercises.components.ExercisesTable.topics')}
          </TableHead>
          <TableHead
            title={getTranslation('modules.exercises.components.ExercisesTable.acceptRate')}
          >
            AC %
          </TableHead>
          <TableHead>
            {getTranslation('modules.exercises.components.ExercisesTable.difficulty')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* TODO: Render the exercises data */}
        <TableRow>
          <TableCell colSpan={5}>
            <ExercisesTableEmpty />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function ExercisesTableEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <InboxIcon className='text-muted-foreground/70' />
        </EmptyMedia>
        <EmptyTitle className='text-muted-foreground/70'>
          {getTranslation('modules.exercises.components.ExercisesTable.noData')}
        </EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}

export function ExercisesTableSkeleton() {
  return (
    <Table className='overflow-hidden rounded-lg'>
      <TableHeader>
        <TableRow className='bg-primary/20 hover:bg-primary/30 transition-colors'>
          <TableHead>
            {getTranslation('modules.exercises.components.ExercisesTable.code')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.exercises.components.ExercisesTable.title')}
          </TableHead>
          <TableHead>
            {getTranslation('modules.exercises.components.ExercisesTable.topics')}
          </TableHead>
          <TableHead
            title={getTranslation('modules.exercises.components.ExercisesTable.acceptRate')}
          >
            AC %
          </TableHead>
          <TableHead>
            {getTranslation('modules.exercises.components.ExercisesTable.difficulty')}
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
              <Skeleton className='h-[1lh] w-[30ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[20ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[4ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[1lh] w-[6ch]' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
