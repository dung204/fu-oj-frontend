import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { CircleXIcon, MedalIcon, SearchIcon } from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/base/components/ui/card';
import { Form } from '@/base/components/ui/form';
import { Input } from '@/base/components/ui/input';
import { Select } from '@/base/components/ui/select';
import { Skeleton } from '@/base/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/base/components/ui/table';
import { Pagination, PaginationSkeleton } from '@/base/layouts/pagination';
import { getTranslation } from '@/base/utils';
import {
  ExercisesTable,
  ExercisesTableSkeleton,
} from '@/modules/exercises/components/exercises-table';
import { ExercisesSearchParams, exercisesSearchParamsSchema } from '@/modules/exercises/types';
import { exercisesQueryOptions } from '@/modules/exercises/utils/exercises-query-options.util';
import { getTopicsAsyncSelectOptions } from '@/modules/topics/utils/topics-async-select-options.util';
import { UserAvatarSkeleton } from '@/modules/users/components/user-avatar';

interface ExercisesPageProps {
  searchParams: Pick<ExercisesSearchParams, 'page' | 'title' | 'topicId'>;
}

export function ExercisesPage({ searchParams }: ExercisesPageProps) {
  const {
    data: {
      data: exercises,
      metadata: { pagination },
    },
  } = useSuspenseQuery(exercisesQueryOptions(searchParams));

  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>
          {getTranslation('modules.exercises.pages.ExercisesPage.title')}
        </h1>
        <hr className='border-b border-border' />
        <Card>
          <CardContent>
            <ExercisesTable exercises={exercises} />
          </CardContent>
          <CardFooter>
            <Pagination pagination={pagination} />
          </CardFooter>
        </Card>
      </section>
      <section className='col-span-1 flex flex-col gap-4'>
        <ExercisesPageFilter searchParams={searchParams} />
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MedalIcon className='size-4' />{' '}
              {getTranslation('modules.exercises.pages.ExercisesPage.leaderboard')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {getTranslation(
                      'modules.exercises.pages.ExercisesPage.leaderboardOrdinalNumberColumn'
                    )}
                  </TableHead>
                  <TableHead>
                    {getTranslation(
                      'modules.exercises.pages.ExercisesPage.leaderboardStudentColumn'
                    )}
                  </TableHead>
                  <TableHead>
                    {getTranslation(
                      'modules.exercises.pages.ExercisesPage.leaderboardAcceptedColumn'
                    )}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: index is fine here, it's static list
                  <TableRow key={`leaderboard-small-skeleton-${index}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <UserAvatarSkeleton />
                        <Skeleton className='h-[1lh] w-[15ch]' />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-[1lh] w-[3ch]' />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className='justify-center'>
            <Link to='/leaderboard'>
              <Button variant='link' size='sm'>
                {getTranslation('modules.exercises.pages.ExercisesPage.leaderboardViewMore')}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

function ExercisesPageFilter({ searchParams }: ExercisesPageProps) {
  const navigate = useNavigate();

  const applySearchParams = ({
    title,
    topicId,
  }: Pick<ExercisesSearchParams, 'title' | 'topicId'>) => {
    navigate({
      to: '.',
      search: {
        title,
        topicId,
      },
    });
  };

  const clearSearchParams = () => {
    navigate({
      to: '.',
      search: {},
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <SearchIcon className='size-4' />{' '}
          {getTranslation('modules.exercises.pages.ExercisesPage.exerciseSearch')}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Form
          key={JSON.stringify(searchParams)}
          schema={exercisesSearchParamsSchema}
          i18nNamespace='modules.exercises.pages.ExercisesPage.ExercisesPageFilter.Form'
          fields={[
            {
              name: 'title',
              type: 'text',
              render: ({ Control }) => <Control />,
            },
            {
              name: 'topicId',
              type: 'select',
              async: true,
              ...getTopicsAsyncSelectOptions('name'),
            },
          ]}
          defaultValues={{
            title: searchParams.title,
            topicId: searchParams.topicId,
          }}
          renderSubmitButton={(SubmitButton) => (
            <div className='flex justify-end gap-2 w-full'>
              <Button type='button' variant='outline' onClick={() => clearSearchParams()}>
                <CircleXIcon />
                {getTranslation(
                  'modules.exercises.pages.ExercisesPage.ExercisesPageFilter.clearSearch'
                )}
              </Button>
              <SubmitButton>
                <SearchIcon />{' '}
                {getTranslation(
                  'modules.exercises.pages.ExercisesPage.ExercisesPageFilter.Form.submitButtonLabel'
                )}
              </SubmitButton>
            </div>
          )}
          onSuccessSubmit={({ title, topicId }) => applySearchParams({ title, topicId })}
          onErrorSubmit={console.log}
        />
      </CardContent>
    </Card>
  );
}

export function ExercisesPageSkeleton({ searchParams }: ExercisesPageProps) {
  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>
          {getTranslation('modules.exercises.pages.ExercisesPage.title')}
        </h1>
        <hr className='border-b border-border' />
        <Card>
          <CardContent>
            <ExercisesTableSkeleton />
          </CardContent>
          <CardFooter>
            <PaginationSkeleton />
          </CardFooter>
        </Card>
      </section>
      <section className='col-span-1 flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <SearchIcon className='size-4' />{' '}
              {getTranslation('modules.exercises.pages.ExercisesPage.exerciseSearch')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Input
              placeholder={getTranslation(
                'modules.exercises.pages.ExercisesPage.exerciseSearchPlaceholder'
              )}
              value={searchParams.title}
              disabled
            />
            <div className='flex flex-col gap-1'>
              <p className='text-sm'>{getTranslation('')}</p>
              <Select
                options={[]}
                placeholder={getTranslation(
                  'modules.exercises.pages.ExercisesPage.ExercisesPageFilter.Form.fields.topicId.placeholder'
                )}
                disabled
              />
            </div>
          </CardContent>
          <CardFooter className='justify-end gap-2'>
            <Button type='button' variant='outline' disabled>
              <CircleXIcon />
              {getTranslation(
                'modules.exercises.pages.ExercisesPage.ExercisesPageFilter.clearSearch'
              )}
            </Button>
            <Button type='button' disabled>
              <SearchIcon />{' '}
              {getTranslation(
                'modules.exercises.pages.ExercisesPage.ExercisesPageFilter.Form.submitButtonLabel'
              )}
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MedalIcon className='size-4' />{' '}
              {getTranslation('modules.exercises.pages.ExercisesPage.leaderboard')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Accepted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: index is fine here, it's static list
                  <TableRow key={`leaderboard-small-skeleton-${index}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <UserAvatarSkeleton />
                        <Skeleton className='h-[1lh] w-[15ch]' />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-[1lh] w-[3ch]' />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className='justify-center'>
            <Link to='/leaderboard'>
              <Button variant='link' size='sm'>
                {getTranslation('modules.exercises.pages.ExercisesPage.leaderboardViewMore')}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
