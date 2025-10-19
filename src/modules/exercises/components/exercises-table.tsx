import { Link } from '@tanstack/react-router';
import { InboxIcon } from 'lucide-react';

import { Badge } from '@/base/components/ui/badge';
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
import { Exercise } from '@/modules/exercises/types';

interface ExercisesTableProps {
  exercises: Exercise[];
}

export function ExercisesTable({ exercises }: ExercisesTableProps) {
  return (
    <Table className='overflow-hidden rounded-lg'>
      <TableHeader>
        <TableRow className='bg-primary/20 hover:bg-primary/30 transition-colors'>
          <TableHead className='w-[10%]'>
            {getTranslation('modules.exercises.components.ExercisesTable.code')}
          </TableHead>
          <TableHead className='w-[50%]'>
            {getTranslation('modules.exercises.components.ExercisesTable.title')}
          </TableHead>
          <TableHead className='w-[40%]'>
            {getTranslation('modules.exercises.components.ExercisesTable.topics')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* TODO: Render the exercises data */}
        {exercises.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3}>
              <ExercisesTableEmpty />
            </TableCell>
          </TableRow>
        ) : (
          exercises.map((exercise) => (
            <TableRow key={exercise.id}>
              <TableCell>{exercise.code}</TableCell>
              <TableCell>
                <Link
                  className='text-primary'
                  to='/exercises/$exerciseId'
                  params={{ exerciseId: exercise.id }}
                >
                  {exercise.title}
                </Link>
              </TableCell>
              <TableCell className='flex gap-2 flex-wrap'>
                {exercise.topics.map((topic) => (
                  <Badge key={`${exercise.id}-${topic.id}`}>{topic.name}</Badge>
                ))}
              </TableCell>
            </TableRow>
          ))
        )}
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
