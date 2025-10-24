import { useSuspenseQuery } from '@tanstack/react-query';

import { SearchInput } from '@/base/components/ui/search-input';
import { Pagination, PaginationSkeleton } from '@/base/layouts/pagination';
import { getTranslation } from '@/base/utils';
import { groupStudentsQueryOptions } from '@/modules/groups/utils/group-students-query-options.util';
import { StudentsTable, StudentsTableSkeleton } from '@/modules/users/components/students-table';
import { StudentsSearchParams } from '@/modules/users/types';

interface GroupStudentsPageProps {
  groupId: string;
  searchParams: Omit<StudentsSearchParams, 'pageSize'>;
}

export function GroupStudentsPage({ groupId, searchParams }: GroupStudentsPageProps) {
  const {
    data: {
      data: students,
      metadata: { pagination },
    },
  } = useSuspenseQuery(groupStudentsQueryOptions(groupId, searchParams));

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex justify-end'>
        <div className='w-1/3'>
          <SearchInput
            searchField='query'
            placeholder={getTranslation(
              'modules.groups.pages.GroupStudentsPage.searchBoxPlaceholder'
            )}
            value={searchParams.query}
          />
        </div>
      </div>
      <StudentsTable students={students} pagination={pagination} />
      <Pagination pagination={pagination} />
    </section>
  );
}

export function GroupStudentsPageSkeleton({
  searchParams,
}: Pick<GroupStudentsPageProps, 'searchParams'>) {
  return (
    <section className='flex flex-col gap-4'>
      <div className='w-1/3'>
        <SearchInput
          searchField='query'
          placeholder={getTranslation(
            'modules.groups.pages.GroupStudentsPage.searchBoxPlaceholder'
          )}
          value={searchParams.query}
        />
      </div>
      <StudentsTableSkeleton />
      <PaginationSkeleton />
    </section>
  );
}
