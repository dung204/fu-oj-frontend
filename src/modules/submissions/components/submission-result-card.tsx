/** biome-ignore-all lint/style/noNestedTernary: nested ternary is required for determining test case status (grading, passed, not passed) */

import { useRouteContext } from '@tanstack/react-router';
import { CheckIcon, ClockIcon, LockIcon, MicrochipIcon, XIcon } from 'lucide-react';
import { Ref, useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/base/components/ui/card';
import { LoadingIndicator } from '@/base/components/ui/loading-indicator';
import { Progress } from '@/base/components/ui/progress';
import { ScrollArea } from '@/base/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/base/components/ui/tabs';
import { cn, stompClient } from '@/base/lib';
import { getTranslation } from '@/base/utils';
import { formatMemory, formatNumberToCurrentLocale } from '@/base/utils/number.utils';
import { Submission } from '@/modules/submissions/types';
import { TestCaseResult, testCaseResultSchema } from '@/modules/test-cases/types';

interface SubmissionResultCardProps {
  exerciseId: string;
  submission: Submission;
  ref?: Ref<HTMLDivElement>;
}

export function SubmissionResultCard({ submission, ref }: SubmissionResultCardProps) {
  const { user } = useRouteContext({
    from: '/_authed/exercises/$exerciseId/',
  });
  const [submissionResult, setSubmissionResult] = useState<
    Submission & { testCaseResults: Record<string, TestCaseResult> }
  >({
    ...submission,
    testCaseResults: {},
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: this subscription only happen once each render
  useEffect(() => {
    const subscription = stompClient.subscribe({
      destination: `/topic/submission-result-updates/${user?.id}`,
      onMessage: ({ body }) => {
        const testCaseResult = testCaseResultSchema.parse(JSON.parse(body));

        setSubmissionResult((prev) => {
          const newTestCasesResults = {
            ...prev.testCaseResults,
            [testCaseResult.testCaseId]: testCaseResult,
          };
          const newPassedTestCases = Object.values(newTestCasesResults).filter(
            (result) => result.passed
          ).length;

          return {
            ...prev,
            testCaseResults: newTestCasesResults,
            passedTestCases: newPassedTestCases,
          };
        });
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const gradedTestCases = Object.keys(submissionResult.testCaseResults).length;

  return (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle
          className={cn('text-2xl', {
            'text-success': submissionResult.passedTestCases === submissionResult.totalTestCases,
            'text-error':
              gradedTestCases === submissionResult.totalTestCases &&
              submissionResult.passedTestCases !== submissionResult.totalTestCases,
          })}
        >
          {getTitle(submissionResult)}
        </CardTitle>
        <CardDescription>{getDescription(submissionResult)}</CardDescription>
        {gradedTestCases !== submissionResult.totalTestCases && (
          <div className='flex items-center gap-4'>
            <Progress
              className='grow'
              max={100}
              value={(gradedTestCases / submissionResult.totalTestCases) * 100}
            />
            <span className='shrink-0'>
              {getTranslation('modules.submissions.components.SubmissionResultCard.graded', {
                gradedTestCases,
                totalTestCases: submissionResult.totalTestCases,
              })}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className='pl-0'>
        <Tabs
          className='flex-row gap-8'
          defaultValue={`test-case-${submissionResult.exercise.testCases[0].id}`}
        >
          <ScrollArea className='h-[400px]'>
            <TabsList className='flex-col h-full bg-transparent p-0'>
              {submissionResult.exercise.testCases.map(({ id }, index) => (
                <TabsTrigger
                  key={`test-case-${id}`}
                  value={`test-case-${id}`}
                  className={cn(
                    'px-10 py-4 text-lg font-normal data-[state=active]:bg-accent rounded-l-none cursor-pointer',
                    !submissionResult.testCaseResults[id]
                      ? 'text-black'
                      : submissionResult.testCaseResults[id].passed
                        ? 'text-success'
                        : 'text-error'
                  )}
                >
                  {!submissionResult.testCaseResults[id] ? (
                    <LoadingIndicator className='size-6' />
                  ) : submissionResult.testCaseResults[id].passed ? (
                    <CheckIcon className='size-6' />
                  ) : (
                    <XIcon className='size-6' />
                  )}
                  <span>Test case {index + 1}</span>
                  {!submissionResult.exercise.testCases[index].isPublic && <LockIcon />}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
          {submissionResult.exercise.testCases.map(({ id }) => (
            <TabsContent
              key={`test-case-${id}-details`}
              value={`test-case-${id}`}
              className='overflow-hidden'
            >
              <ScrollArea className='h-[400px]'>
                {!submissionResult.testCaseResults[id] ? (
                  <div className='h-[400px] flex flex-col justify-center items-center gap-4'>
                    <LoadingIndicator className='size-16' />
                    {getTranslation(
                      'modules.submissions.components.SubmissionResultCard.gradingTitle'
                    )}
                  </div>
                ) : (
                  <>
                    <div className='flex justify-end gap-6'>
                      <div className='flex items-center gap-1.5'>
                        <ClockIcon />
                        <span>
                          {!submissionResult.testCaseResults[id].time
                            ? '--'
                            : formatNumberToCurrentLocale(
                                Number(submissionResult.testCaseResults[id].time)
                              )}{' '}
                          s
                        </span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <MicrochipIcon />
                        <span>
                          {formatMemory(Number(submissionResult.testCaseResults[id].memory))}
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col gap-8'>
                      <div className='space-y-1'>
                        <p className='text-sm'>
                          {getTranslation(
                            'modules.submissions.components.SubmissionResultCard.result'
                          )}
                        </p>
                        <pre className='bg-accent p-2.5 w-full overflow-x-auto'>
                          <code>{submissionResult.testCaseResults[id].status.description}</code>
                        </pre>
                      </div>
                      {submissionResult.testCaseResults[id].compileOutput && (
                        <div className='space-y-1'>
                          <p className='text-sm'>
                            {getTranslation(
                              'modules.submissions.components.SubmissionResultCard.compilerMessage'
                            )}
                          </p>
                          <pre className='bg-accent p-2.5 w-full overflow-x-auto'>
                            <code>{submissionResult.testCaseResults[id].compileOutput}</code>
                          </pre>
                        </div>
                      )}
                      {!submissionResult.testCaseResults[id].isPublic ? (
                        <div className='flex flex-col justify-center items-center gap-4'>
                          <LockIcon className='size-16' />
                          {getTranslation(
                            'modules.submissions.components.SubmissionResultCard.hiddenTestCase'
                          )}
                        </div>
                      ) : (
                        <>
                          {submissionResult.testCaseResults[id].stderr && (
                            <div className='space-y-1'>
                              <p className='text-sm'>
                                {getTranslation(
                                  'modules.submissions.components.SubmissionResultCard.stderr'
                                )}
                              </p>
                              <pre className='bg-accent p-2.5 w-full overflow-x-auto'>
                                <code>{submissionResult.testCaseResults[id].stderr}</code>
                              </pre>
                            </div>
                          )}
                          {submissionResult.testCaseResults[id].input && (
                            <div className='space-y-1'>
                              <p className='text-sm'>
                                {getTranslation(
                                  'modules.submissions.components.SubmissionResultCard.input'
                                )}
                              </p>
                              <pre className='bg-accent p-2.5 overflow-x-auto'>
                                <code>{submissionResult.testCaseResults[id].input}</code>
                              </pre>
                            </div>
                          )}
                          {submissionResult.testCaseResults[id].actualOutput && (
                            <div className='space-y-1'>
                              <p className='text-sm'>
                                {getTranslation(
                                  'modules.submissions.components.SubmissionResultCard.yourOutput'
                                )}
                              </p>
                              <pre className='bg-accent p-2.5 overflow-x-auto'>
                                <code>{submissionResult.testCaseResults[id].actualOutput}</code>
                              </pre>
                            </div>
                          )}
                          {submissionResult.testCaseResults[id].expectedOutput && (
                            <div className='space-y-1'>
                              <p className='text-sm'>
                                {getTranslation(
                                  'modules.submissions.components.SubmissionResultCard.expectedOutput'
                                )}
                              </p>
                              <pre className='bg-accent p-2.5 overflow-x-auto'>
                                <code>{submissionResult.testCaseResults[id].expectedOutput}</code>
                              </pre>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

function getTitle(
  submissionResult: Submission & {
    testCaseResults: Record<string, TestCaseResult>;
  }
) {
  if (Object.keys(submissionResult.testCaseResults).length !== submissionResult.totalTestCases) {
    return getTranslation('modules.submissions.components.SubmissionResultCard.gradingTitle');
  }

  if (submissionResult.passedTestCases === submissionResult.totalTestCases) {
    return getTranslation('modules.submissions.components.SubmissionResultCard.successTitle');
  }

  return getTranslation('modules.submissions.components.SubmissionResultCard.failedTitle');
}

function getDescription(
  submissionResult: Submission & {
    testCaseResults: Record<string, TestCaseResult>;
  }
) {
  if (Object.keys(submissionResult.testCaseResults).length !== submissionResult.totalTestCases) {
    return getTranslation('modules.submissions.components.SubmissionResultCard.gradingDescription');
  }

  if (submissionResult.passedTestCases === submissionResult.totalTestCases) {
    return getTranslation('modules.submissions.components.SubmissionResultCard.successDescription');
  }

  return getTranslation('modules.submissions.components.SubmissionResultCard.failedDescription', {
    passedTestCases: submissionResult.passedTestCases,
    totalTestCases: submissionResult.totalTestCases,
  });
}
