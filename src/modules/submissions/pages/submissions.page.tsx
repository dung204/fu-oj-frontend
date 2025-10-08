import { ChartPieIcon, CircleXIcon, CodeXmlIcon, FilterIcon } from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/base/components/ui/card';
import { Select } from '@/base/components/ui/select';
import { PaginationSkeleton } from '@/base/layouts/pagination';
import { getTranslation } from '@/base/utils';
import { SubmissionsChart } from '@/modules/submissions/components/submissions-chart';
import {
  SubmissionsTable,
  SubmissionsTableSkeleton,
} from '@/modules/submissions/components/submissions-table';

export function SubmissionsPage() {
  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>
          {getTranslation('modules.submissions.pages.SubmissionsPage.title')}
        </h1>
        <hr className='border-b border-border' />
        <Card>
          <CardContent>
            <SubmissionsTable />
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
              <FilterIcon className='size-4' />
              {getTranslation('modules.submissions.pages.SubmissionsPage.submissionsFilter')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p className='text-sm'>
                {getTranslation(
                  'modules.submissions.pages.SubmissionsPage.submissionsResultFilterTitle'
                )}
              </p>
              {/* TODO: replace the below Select with AsyncSelect when the topics API is ready */}
              <Select
                options={[]}
                placeholder={getTranslation(
                  'modules.submissions.pages.SubmissionsPage.submissionsResultFilterPlaceholder'
                )}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-sm'>
                {getTranslation(
                  'modules.submissions.pages.SubmissionsPage.submissionsLanguageFilterTitle'
                )}
              </p>
              {/* TODO: replace the below Select with AsyncSelect when the topics API is ready */}
              <Select
                options={[]}
                placeholder={getTranslation(
                  'modules.submissions.pages.SubmissionsPage.submissionsLanguageFilterPlaceholder'
                )}
              />
            </div>
          </CardContent>
          <CardFooter className='justify-end gap-2'>
            <Button type='button' variant='outline'>
              <CircleXIcon />
              {getTranslation('modules.submissions.pages.SubmissionsPage.clearFilter')}
            </Button>
            <Button type='button'>
              <FilterIcon />{' '}
              {getTranslation('modules.submissions.pages.SubmissionsPage.applyFilter')}
            </Button>
          </CardFooter>
        </Card>
        <Card className='gap-0'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ChartPieIcon className='size-4' />
              {getTranslation('modules.submissions.pages.SubmissionsPage.statistics')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1'>
            <SubmissionsChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CodeXmlIcon className='size-4' />
              {getTranslation('modules.submissions.pages.SubmissionsPage.explanationOfResults')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <p className='text-success text-sm'>
              AC: {getTranslation('modules.submissions.pages.SubmissionsPage.accepted')}
            </p>
            <p className='text-error text-sm'>
              WA: {getTranslation('modules.submissions.pages.SubmissionsPage.wrongAnswer')}
            </p>
            <p className='text-error text-sm'>
              TLE: {getTranslation('modules.submissions.pages.SubmissionsPage.timeLimitExceeded')}
            </p>
            <p className='text-error text-sm'>
              MLE: {getTranslation('modules.submissions.pages.SubmissionsPage.memoryLimitExceeded')}
            </p>
            <p className='text-error text-sm'>
              RTE: {getTranslation('modules.submissions.pages.SubmissionsPage.runtimeError')}
            </p>
            <p className='text-error text-sm'>
              IR: {getTranslation('modules.submissions.pages.SubmissionsPage.invalidReturn')}
            </p>
            <p className='text-sm'>
              CE: {getTranslation('modules.submissions.pages.SubmissionsPage.compilationError')}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export function SubmissionsPageSkeleton() {
  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>
          {getTranslation('modules.submissions.pages.SubmissionsPage.title')}
        </h1>
        <hr className='border-b border-border' />
        <Card>
          <CardContent>
            <SubmissionsTableSkeleton />
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
              <FilterIcon className='size-4' />
              {getTranslation('modules.submissions.pages.SubmissionsPage.submissionsFilter')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p className='text-sm'>
                {getTranslation(
                  'modules.submissions.pages.SubmissionsPage.submissionsResultFilterTitle'
                )}
              </p>
              {/* TODO: replace the below Select with AsyncSelect when the topics API is ready */}
              <Select
                options={[]}
                placeholder={getTranslation(
                  'modules.submissions.pages.SubmissionsPage.submissionsResultFilterPlaceholder'
                )}
                disabled
              />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-sm'>
                {getTranslation(
                  'modules.submissions.pages.SubmissionsPage.submissionsLanguageFilterTitle'
                )}
              </p>
              {/* TODO: replace the below Select with AsyncSelect when the topics API is ready */}
              <Select
                options={[]}
                placeholder={getTranslation(
                  'modules.submissions.pages.SubmissionsPage.submissionsLanguageFilterPlaceholder'
                )}
                disabled
              />
            </div>
          </CardContent>
          <CardFooter className='justify-end gap-2'>
            <Button type='button' variant='outline' disabled>
              <CircleXIcon />
              {getTranslation('modules.submissions.pages.SubmissionsPage.clearFilter')}
            </Button>
            <Button type='button' disabled>
              <FilterIcon />{' '}
              {getTranslation('modules.submissions.pages.SubmissionsPage.applyFilter')}
            </Button>
          </CardFooter>
        </Card>
        <Card className='gap-0'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ChartPieIcon className='size-4' />
              {getTranslation('modules.submissions.pages.SubmissionsPage.statistics')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1'>
            <SubmissionsChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CodeXmlIcon className='size-4' />
              {getTranslation('modules.submissions.pages.SubmissionsPage.explanationOfResults')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <p className='text-success text-sm'>
              AC: {getTranslation('modules.submissions.pages.SubmissionsPage.accepted')}
            </p>
            <p className='text-error text-sm'>
              WA: {getTranslation('modules.submissions.pages.SubmissionsPage.wrongAnswer')}
            </p>
            <p className='text-error text-sm'>
              TLE: {getTranslation('modules.submissions.pages.SubmissionsPage.timeLimitExceeded')}
            </p>
            <p className='text-error text-sm'>
              MLE: {getTranslation('modules.submissions.pages.SubmissionsPage.memoryLimitExceeded')}
            </p>
            <p className='text-error text-sm'>
              RTE: {getTranslation('modules.submissions.pages.SubmissionsPage.runtimeError')}
            </p>
            <p className='text-error text-sm'>
              IR: {getTranslation('modules.submissions.pages.SubmissionsPage.invalidReturn')}
            </p>
            <p className='text-sm'>
              CE: {getTranslation('modules.submissions.pages.SubmissionsPage.compilationError')}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
