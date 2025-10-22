import { CheckIcon, ClockIcon, MicrochipIcon, XIcon } from 'lucide-react';
import { Ref } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/base/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/base/components/ui/tabs';
import { cn } from '@/base/lib';
import { getTranslation } from '@/base/utils';
import { formatMemory, formatNumberToCurrentLocale } from '@/base/utils/number.utils';
import { RunCodeResult } from '@/modules/submissions/types';

interface RunCodeResultCardProps {
  runCodeResult: RunCodeResult;
  ref?: Ref<HTMLDivElement>;
}

export function RunCodeResultCard({ runCodeResult, ref }: RunCodeResultCardProps) {
  const { allPassed, passedTestCases, totalTestCases, results } = runCodeResult;

  return (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle className={cn('text-2xl', allPassed ? 'text-success' : 'text-error')}>
          {allPassed
            ? getTranslation('modules.submissions.components.RunCodeResultCard.successTitle')
            : getTranslation('modules.submissions.components.RunCodeResultCard.failedTitle')}
        </CardTitle>
        <CardDescription>
          {allPassed
            ? getTranslation('modules.submissions.components.RunCodeResultCard.successDescription')
            : getTranslation('modules.submissions.components.RunCodeResultCard.failedDescription', {
                passedTestCases,
                totalTestCases,
              })}
        </CardDescription>
      </CardHeader>
      <CardContent className='pl-0'>
        <Tabs className='flex-row gap-8' defaultValue={`test-case-${results[0].testCaseId}`}>
          <TabsList className='flex-col h-full bg-transparent p-0'>
            {results.map(({ testCaseId, testCaseIndex, passed }) => (
              <TabsTrigger
                key={`test-case-${testCaseId}`}
                value={`test-case-${testCaseId}`}
                className={cn(
                  'px-10 py-4 text-lg font-normal data-[state=active]:bg-accent rounded-l-none cursor-pointer',
                  passed ? 'text-success' : 'text-error'
                )}
              >
                {passed ? <CheckIcon className='size-6' /> : <XIcon className='size-6' />}
                Test case {testCaseIndex}
              </TabsTrigger>
            ))}
          </TabsList>
          {results.map((result) => (
            <TabsContent
              key={`test-case-${result.testCaseId}-details`}
              value={`test-case-${result.testCaseId}`}
              className='overflow-hidden'
            >
              <div className='flex justify-end gap-6'>
                <div className='flex items-center gap-1.5'>
                  <ClockIcon />
                  <span>
                    {!result.time ? '--' : formatNumberToCurrentLocale(Number(result.time))} s
                  </span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <MicrochipIcon />
                  <span>{formatMemory(result.memory)}</span>
                </div>
              </div>
              <div className='flex flex-col gap-8'>
                <div className='space-y-1'>
                  <p className='text-sm'>
                    {getTranslation('modules.submissions.components.RunCodeResultCard.result')}
                  </p>
                  <pre className='bg-accent p-2.5 w-full overflow-x-auto'>
                    <code>{result.status.description}</code>
                  </pre>
                </div>
                {result.compileOutput && (
                  <div className='space-y-1'>
                    <p className='text-sm'>
                      {getTranslation(
                        'modules.submissions.components.RunCodeResultCard.compilerMessage'
                      )}
                    </p>
                    <pre className='bg-accent p-2.5 w-full overflow-x-auto'>
                      <code>{result.compileOutput}</code>
                    </pre>
                  </div>
                )}
                {result.stderr && (
                  <div className='space-y-1'>
                    <p className='text-sm'>
                      {getTranslation('modules.submissions.components.RunCodeResultCard.stderr')}
                    </p>
                    <pre className='bg-accent p-2.5 w-full overflow-x-auto'>
                      <code>{result.stderr}</code>
                    </pre>
                  </div>
                )}
                {result.input && (
                  <div className='space-y-1'>
                    <p className='text-sm'>
                      {getTranslation('modules.submissions.components.RunCodeResultCard.input')}
                    </p>
                    <pre className='bg-accent p-2.5 overflow-x-auto'>
                      <code>{result.input}</code>
                    </pre>
                  </div>
                )}
                {result.actualOutput && (
                  <div className='space-y-1'>
                    <p className='text-sm'>
                      {getTranslation(
                        'modules.submissions.components.RunCodeResultCard.yourOutput'
                      )}
                    </p>
                    <pre className='bg-accent p-2.5 overflow-x-auto'>
                      <code>{result.actualOutput}</code>
                    </pre>
                  </div>
                )}
                {result.expectedOutput && (
                  <div className='space-y-1'>
                    <p className='text-sm'>
                      {getTranslation(
                        'modules.submissions.components.RunCodeResultCard.expectedOutput'
                      )}
                    </p>
                    <pre className='bg-accent p-2.5 overflow-x-auto'>
                      <code>{result.expectedOutput}</code>
                    </pre>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
