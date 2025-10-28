import { useSuspenseQuery } from '@tanstack/react-query';
import { ChartPieIcon, CircleXIcon, CodeXmlIcon, FilterIcon } from 'lucide-react';
import { CSSProperties } from 'react';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/base/components/ui/card';
import { Pagination, PaginationSkeleton } from '@/base/layouts/pagination';
import { getTranslation } from '@/base/utils';
import { SubmissionsChart } from '@/modules/submissions/components/submissions-chart';
import { SubmissionsFilterForm } from '@/modules/submissions/components/submissions-filter-form';
import {
  SubmissionsTable,
  SubmissionsTableSkeleton,
} from '@/modules/submissions/components/submissions-table';
import { VerdictBadge } from '@/modules/submissions/components/verdict-badge';
import { verdicts } from '@/modules/submissions/constants/verdicts.constant';
import { SubmissionsSearchParams } from '@/modules/submissions/types';
import { submissionsQueryOptions } from '@/modules/submissions/utils/submissions-query-options.util';

interface SubmissionsPageProps {
  searchParams: SubmissionsSearchParams;
}

export function SubmissionsPage({ searchParams }: SubmissionsPageProps) {
  const {
    data: {
      data: submissions,
      metadata: { pagination },
    },
  } = useSuspenseQuery(submissionsQueryOptions(searchParams));

  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>
          {getTranslation('modules.submissions.pages.SubmissionsPage.title')}
        </h1>
        <hr className='border-b border-border' />
        <Card>
          <CardContent>
            <SubmissionsTable submissions={submissions} />
          </CardContent>
          <CardFooter>
            <Pagination pagination={pagination} />
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
            <SubmissionsFilterForm
              key={JSON.stringify(searchParams)}
              defaultValues={{
                status: searchParams.status,
                languageCode: searchParams.languageCode,
              }}
            />
          </CardContent>
        </Card>
        {submissions.length > 0 && (
          <Card className='gap-0'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <ChartPieIcon className='size-4' />
                {getTranslation('modules.submissions.pages.SubmissionsPage.statistics')}
              </CardTitle>
            </CardHeader>
            <CardContent className='flex-1'>
              <SubmissionsChart searchParams={searchParams} />
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CodeXmlIcon className='size-4' />
              {getTranslation('modules.submissions.pages.SubmissionsPage.explanationOfResults')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            {Object.entries(verdicts)
              .slice(2)
              .map(([verdict, { id, color }]) => (
                <div key={`verdict-${id}`} className='flex items-center gap-2'>
                  <VerdictBadge verdict={verdict as keyof typeof verdicts} />
                  <span
                    key={`verdict-${id}`}
                    className='text-(--verdict-color)'
                    style={{ '--verdict-color': color } as CSSProperties}
                  >
                    {getTranslation(`modules.submissions.pages.SubmissionsPage.${verdict}`)}
                  </span>
                </div>
              ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export function SubmissionsPageSkeleton({ searchParams }: SubmissionsPageProps) {
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
            <SubmissionsFilterForm
              key={JSON.stringify(searchParams)}
              defaultValues={{
                status: searchParams.status,
                languageCode: searchParams.languageCode,
              }}
            />
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
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CodeXmlIcon className='size-4' />
              {getTranslation('modules.submissions.pages.SubmissionsPage.explanationOfResults')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            {Object.entries(verdicts)
              .slice(2)
              .map(([verdict, { id, color }]) => (
                <div key={`verdict-${id}`} className='flex items-center gap-2'>
                  <VerdictBadge verdict={verdict as keyof typeof verdicts} />
                  <span
                    key={`verdict-${id}`}
                    className='text-(--verdict-color)'
                    style={{ '--verdict-color': color } as CSSProperties}
                  >
                    {getTranslation(`modules.submissions.pages.SubmissionsPage.${verdict}`)}
                  </span>
                </div>
              ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
