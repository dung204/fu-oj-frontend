import { useSuspenseQuery } from '@tanstack/react-query';
import { FilterIcon } from 'lucide-react';
import { ComponentProps, useState } from 'react';

import { Badge } from '@/base/components/ui/badge';
import { Button } from '@/base/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/base/components/ui/dialog';
import { Pagination, PaginationSkeleton } from '@/base/layouts/pagination';
import { getTranslation } from '@/base/utils';
import { ExercisesFilterForm } from '@/modules/exercises/components/exercises-filter-form';
import {
  ExercisesTable,
  ExercisesTableSkeleton,
} from '@/modules/exercises/components/exercises-table';
import { ExercisesSearchParams } from '@/modules/exercises/types';
import { groupExercisesQueryOptions } from '@/modules/groups/utils/group-exercises-query-options.util';

interface GroupExercisesPageProps {
  groupId: string;
  searchParams: Omit<ExercisesSearchParams, 'pageSize'>;
}

export function GroupExercisesPage({ groupId, searchParams }: GroupExercisesPageProps) {
  const [groupExercisesFilterDialogOpen, setGroupExercisesFilterDialogOpen] = useState(false);

  const {
    data: {
      data: exercises,
      metadata: { pagination },
    },
  } = useSuspenseQuery(groupExercisesQueryOptions(groupId, searchParams));

  return (
    <>
      <section className='flex flex-col gap-4'>
        <div className='flex justify-end'>
          <Button
            variant='outline'
            onClick={() => setGroupExercisesFilterDialogOpen(true)}
            className='relative'
          >
            {(searchParams.topic || searchParams.query) && (
              <Badge variant='error' className='absolute -top-2 -right-2 rounded-full'>
                {(searchParams.topic ? 1 : 0) + (searchParams.query ? 1 : 0)}
              </Badge>
            )}
            <FilterIcon />
            {getTranslation(
              'modules.groups.pages.GroupExercisesPage.GroupExerciseFilterDialog.buttonLabel'
            )}
          </Button>
        </div>
        <ExercisesTable exercises={exercises} />
        <Pagination pagination={pagination} />
      </section>
      <GroupExercisesFilterDialog
        searchParams={searchParams}
        open={groupExercisesFilterDialogOpen}
        onOpenChange={setGroupExercisesFilterDialogOpen}
      />
    </>
  );
}

export function GroupExercisesPageSkeleton({
  searchParams,
}: Pick<GroupExercisesPageProps, 'searchParams'>) {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex justify-end'>
        <Button variant='outline' disabled className='relative'>
          {(searchParams.topic || searchParams.query) && (
            <Badge variant='error' className='absolute -top-2 -right-2 rounded-full'>
              {(searchParams.topic ? 1 : 0) + (searchParams.query ? 1 : 0)}
            </Badge>
          )}
          <FilterIcon />
          {getTranslation(
            'modules.groups.pages.GroupExercisesPage.GroupExerciseFilterDialog.buttonLabel'
          )}
        </Button>
      </div>
      <ExercisesTableSkeleton />
      <PaginationSkeleton />
    </section>
  );
}

function GroupExercisesFilterDialog({
  searchParams,
  ...props
}: ComponentProps<typeof Dialog> & Pick<GroupExercisesPageProps, 'searchParams'>) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {getTranslation(
              'modules.groups.pages.GroupExercisesPage.GroupExerciseFilterDialog.title'
            )}
          </DialogTitle>
        </DialogHeader>
        <ExercisesFilterForm
          defaultValues={{ query: searchParams.query, topic: searchParams.topic }}
          onSuccessSubmit={() => props.onOpenChange?.(false)}
          onClearSearch={() => props.onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
