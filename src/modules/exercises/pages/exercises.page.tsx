import { Link } from '@tanstack/react-router';
import { CircleXIcon, MedalIcon, SearchIcon } from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/base/components/ui/card';
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
import { PaginationSkeleton } from '@/base/layouts/pagination';
import { getTranslation } from '@/base/utils';
import {
  ExercisesTable,
  ExercisesTableSkeleton,
} from '@/modules/exercises/components/exercises-table';
import { UserAvatarSkeleton } from '@/modules/users/components/user-avatar';

export function ExercisesPage() {
  // TODO: Fetch data, implement search and filtering

  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>
          {getTranslation('modules.exercises.pages.ExercisesPage.title')}
        </h1>
        <hr className='border-b border-border' />
        <Card>
          <CardContent>
            <ExercisesTable />
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
            />
            <div className='flex flex-col gap-1'>
              <p className='text-sm'>
                {getTranslation('modules.exercises.pages.ExercisesPage.topicSearchTitle')}
              </p>
              {/* TODO: replace the below Select with AsyncSelect when the topics API is ready */}
              <Select
                options={[]}
                placeholder={getTranslation(
                  'modules.exercises.pages.ExercisesPage.topicSearchPlaceholder'
                )}
              />
            </div>
          </CardContent>
          <CardFooter className='justify-end gap-2'>
            <Button type='button' variant='outline'>
              <CircleXIcon />
              {getTranslation('modules.exercises.pages.ExercisesPage.clearSearch')}
            </Button>
            <Button type='button'>
              <SearchIcon /> {getTranslation('modules.exercises.pages.ExercisesPage.applySearch')}
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

export function ExercisesPageSkeleton() {
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
              disabled
            />
            <div className='flex flex-col gap-1'>
              <p className='text-sm'>
                {getTranslation('modules.exercises.pages.ExercisesPage.topicSearchTitle')}
              </p>
              <Select
                options={[]}
                placeholder={getTranslation(
                  'modules.exercises.pages.ExercisesPage.topicSearchPlaceholder'
                )}
                disabled
              />
            </div>
          </CardContent>
          <CardFooter className='justify-end gap-2'>
            <Button type='button' variant='outline' disabled>
              <CircleXIcon />
              {getTranslation('modules.exercises.pages.ExercisesPage.clearSearch')}
            </Button>
            <Button type='button' disabled>
              <SearchIcon /> {getTranslation('modules.exercises.pages.ExercisesPage.applySearch')}
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
