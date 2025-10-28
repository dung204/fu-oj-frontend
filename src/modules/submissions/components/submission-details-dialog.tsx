/** biome-ignore-all lint/style/noNestedTernary: nested ternary is fine, not too nested */

import CodeEditor from '@monaco-editor/react';
import { ComponentProps } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/base/components/ui/dialog';
import { LoadingIndicator } from '@/base/components/ui/loading-indicator';
import { programmingLanguages } from '@/base/components/ui/programming-language-select';
import { useLocalStorage } from '@/base/hooks';
import { formatDateTimeOfCurrentLocale, getTranslation } from '@/base/utils';
import { VerdictBadge } from '@/modules/submissions/components/verdict-badge';
import { verdicts } from '@/modules/submissions/constants/verdicts.constant';
import { Submission } from '@/modules/submissions/types';
import { UserAvatar } from '@/modules/users/components/user-avatar';

interface SubmissionDetailsDialog extends ComponentProps<typeof Dialog> {
  submission: Submission | undefined;
}

export function SubmissionDetailsDialog({ submission, ...props }: SubmissionDetailsDialog) {
  const [theme] = useLocalStorage<'light' | 'vs-dark'>('MONACO_EDITOR_THEME', 'light');

  return (
    <Dialog {...props}>
      <DialogContent className='max-w-[1000px]!'>
        <DialogHeader>
          <DialogTitle>{!submission ? '--' : submission.exercise.title}</DialogTitle>
        </DialogHeader>
        <section className='flex flex-col gap-2'>
          <div>
            <span className='font-medium'>
              {getTranslation(
                'modules.submissions.components.SubmissionDetailsDialog.submissionTime'
              )}
            </span>
            : {submission ? formatDateTimeOfCurrentLocale(submission.createdTimestamp) : '--'}
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-medium'>
              {getTranslation('modules.submissions.components.SubmissionDetailsDialog.student')}:
            </span>{' '}
            {submission ? (
              <div className='flex items-center gap-2'>
                <UserAvatar user={submission.user} />
                <span className='font-medium'>
                  {submission.user.firstName} {submission.user.lastName} -{' '}
                  {submission.user.rollNumber}
                </span>
              </div>
            ) : (
              '--'
            )}
          </div>
          <div>
            <span className='font-medium'>
              {getTranslation('modules.submissions.components.SubmissionDetailsDialog.result')}
            </span>
            :{' '}
            {!submission ? (
              '--'
            ) : ['IN_QUEUE', 'PROCESSING'].includes(submission.verdict) ? (
              <LoadingIndicator />
            ) : (
              <VerdictBadge verdict={submission.verdict as keyof typeof verdicts} />
            )}
          </div>
          <div>
            <span className='font-medium'>
              {getTranslation(
                'modules.submissions.components.SubmissionDetailsDialog.passedTestCasesOverTotalTestCases'
              )}
            </span>
            :{' '}
            {!submission ? (
              '--'
            ) : (
              <span>
                {submission.passedTestCases} / {submission.totalTestCases}
              </span>
            )}
          </div>
          <div>
            <span className='font-medium'>
              {getTranslation('modules.submissions.components.SubmissionDetailsDialog.language')}
            </span>
            :{' '}
            {!submission
              ? '--'
              : programmingLanguages.find((lang) => lang.id === Number(submission.languageCode))
                  ?.name || 'Unknown'}
          </div>
          <CodeEditor
            height='65vh'
            language={
              !submission
                ? ''
                : programmingLanguages.find((lang) => lang.id === Number(submission.languageCode))
                    ?.editorValue
            }
            theme={theme}
            value={!submission ? '' : submission.sourceCode}
            options={{
              readOnly: true,
            }}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
}
