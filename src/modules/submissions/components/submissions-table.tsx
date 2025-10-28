import { Link } from '@tanstack/react-router';
import { EyeIcon, ListChecksIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/base/components/ui/button';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/base/components/ui/empty';
import { LoadingIndicator } from '@/base/components/ui/loading-indicator';
import { programmingLanguages } from '@/base/components/ui/programming-language-select';
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
import { formatMemory, formatNumberToCurrentLocale } from '@/base/utils/number.utils';
import { VerdictBadge } from '@/modules/submissions/components/verdict-badge';
import { Submission } from '@/modules/submissions/types';
import { UserAvatar } from '@/modules/users/components/user-avatar';

import { verdicts } from '../constants/verdicts.constant';

import { SubmissionDetailsDialog } from './submission-details-dialog';

interface SubmissionsTableProps {
  submissions: Submission[];
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const [submission, setSubmission] = useState<Submission>();
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  return (
    <>
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
            <TableHead></TableHead>
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
                  <div className='flex items-center gap-2'>
                    <UserAvatar user={submission.user} />
                    <span className='font-medium'>
                      {submission.user.firstName} {submission.user.lastName} -{' '}
                      {submission.user.rollNumber}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {['IN_QUEUE', 'PROCESSING'].includes(submission.verdict) ? (
                    <LoadingIndicator />
                  ) : (
                    <VerdictBadge verdict={submission.verdict as keyof typeof verdicts} />
                  )}
                </TableCell>
                <TableCell>
                  <Link to='/exercises/$exerciseId' params={{ exerciseId: submission.exercise.id }}>
                    <Button variant='link' className='p-0! size-max font-normal'>
                      {submission.exercise.title}
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  {submission.time
                    ? `${formatNumberToCurrentLocale(Number(submission.time))} s`
                    : '--'}
                </TableCell>
                <TableCell>
                  {submission.memory ? formatMemory(Number(submission.memory)) : '--'}
                </TableCell>
                <TableCell>
                  {programmingLanguages.find((lang) => lang.id === Number(submission.languageCode))
                    ?.name || 'Unknown'}
                </TableCell>
                <TableCell>
                  <Button
                    variant='ghost'
                    size='icon'
                    title={getTranslation(
                      'modules.submissions.components.SubmissionsTable.seeDetailsTitle'
                    )}
                    onClick={() => {
                      setSubmission(submission);
                      setDetailsDialogOpen(true);
                    }}
                  >
                    <EyeIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <SubmissionDetailsDialog
        submission={submission}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </>
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
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 20 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: index is fine here, it's static list
          <TableRow key={`exercise-skeleton-${index}`}>
            <TableCell>
              <Skeleton className='h-lh w-[10ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-lh w-[20ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-lh w-[4ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-lh w-[20ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-lh w-[5ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-lh w-[5ch]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-lh w-[8ch]' />
            </TableCell>
            <TableCell>
              <Button variant='ghost' size='icon' disabled>
                <EyeIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
