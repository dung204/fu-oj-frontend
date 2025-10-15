import CodeEditor from '@monaco-editor/react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  CheckIcon,
  ClockIcon,
  FlagTriangleRightIcon,
  LayoutGridIcon,
  ListChecks,
  MicrochipIcon,
  MoonIcon,
  PlayIcon,
  SendIcon,
  SunIcon,
  Trophy,
  UserIcon,
  XIcon,
} from 'lucide-react';
import { RefObject, useRef, useState } from 'react';

import { Badge } from '@/base/components/ui/badge';
import { Button } from '@/base/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/base/components/ui/card';
import { Form, FormRef } from '@/base/components/ui/form';
import {
  ProgrammingLanguageSelect,
  programmingLanguages,
} from '@/base/components/ui/programming-language-select';
import { Skeleton } from '@/base/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/base/components/ui/tabs';
import { useLocalStorage } from '@/base/hooks';
import { cn } from '@/base/lib';
import { getTranslation } from '@/base/utils';
import { exercisesService } from '@/modules/exercises/services/exercises.service';
import { Exercise } from '@/modules/exercises/types';
import { submissionsService } from '@/modules/submissions/services/submissions.service';
import {
  CreateSubmissionPayload,
  createSubmissionSchema,
  RunCodeResult,
} from '@/modules/submissions/types';
import { ExampleTestCaseCard } from '@/modules/test-cases/components/example-test-case-card';
import { UserAvatarSkeleton } from '@/modules/users/components/user-avatar';

interface ExerciseDetailsPageProps {
  exerciseId: string;
}

export function ExerciseDetailsPage({ exerciseId }: ExerciseDetailsPageProps) {
  const submissionSectionRef = useRef<HTMLDivElement>(null);

  const {
    data: { data: exercise },
  } = useSuspenseQuery({
    queryKey: ['exercises', { id: exerciseId }],
    queryFn: () => exercisesService.getExerciseById(exerciseId),
  });

  return (
    <div className='grid grid-cols-4 gap-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl'>
            {exercise.code} - {exercise.title}
          </h1>
          <div className='flex gap-4'>
            <Button variant='error'>
              <FlagTriangleRightIcon />
              {getTranslation('modules.exercises.ExerciseDetailsPage.report')}
            </Button>
            <Button
              variant='success'
              onClick={() => submissionSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <SendIcon />
              {getTranslation('modules.exercises.ExerciseDetailsPage.submitCode')}
            </Button>
          </div>
        </div>
        <hr className='border-b border-border' />
        <Card>
          <CardContent className='flex gap-4 flex-col'>
            <article className='prose max-w-none'>
              <p>{exercise.description}</p>
              <h3 className='text-accent1'>
                {getTranslation('modules.exercises.ExerciseDetailsPage.inputRequirements')}
              </h3>
              <ul>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, inventore?</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              </ul>
              <h3 className='text-accent1'>
                {getTranslation('modules.exercises.ExerciseDetailsPage.outputRequirements')}
              </h3>
              <ul>
                <li>Lorem ipsum dolor sit amet.</li>
              </ul>
              {exercise.testCases?.length !== 0 && (
                <h3 className='text-accent1'>
                  {getTranslation('modules.exercises.ExerciseDetailsPage.examples')}
                </h3>
              )}
            </article>
            {exercise.testCases?.map(
              (testCase, index) =>
                testCase.isPublic && <ExampleTestCaseCard index={index + 1} testCase={testCase} />
            )}
          </CardContent>
        </Card>
        <ExerciseSubmission ref={submissionSectionRef} exercise={exercise} />
      </section>
      <section className='col-span-1 flex flex-col gap-4'>
        <ExerciseExtraInfo exercise={exercise} />
        <Button>
          <ListChecks />
          {getTranslation('modules.exercises.ExerciseDetailsPage.allSubmissions')}
        </Button>
        <Button variant='success'>
          <Trophy />
          {getTranslation('modules.exercises.ExerciseDetailsPage.bestSubmissions')}
        </Button>
      </section>
    </div>
  );
}

interface ExerciseExtraInfoProps {
  exercise: Exercise;
}

function ExerciseExtraInfo({ exercise }: ExerciseExtraInfoProps) {
  return (
    <Card>
      <CardContent className='text-sm flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <UserIcon className='size-5' />
            {getTranslation('modules.exercises.ExerciseDetailsPage.author')}:
          </div>
          <div className='flex items-center gap-1.5 shrink-0'>
            <UserAvatarSkeleton className='size-6' />
            <span className='font-medium'>Lorem, ipsum.</span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1 shrink-0'>
            <LayoutGridIcon className='size-5' />
            {getTranslation('modules.exercises.ExerciseDetailsPage.topics')}:
          </div>
          <div className='flex gap-1.5 flex-wrap'>
            {exercise.topics.map((topic) => (
              <Link key={`${topic.id}-link`} to='/exercises' search={{ topicId: topic.id }}>
                <Badge>{topic.name}</Badge>
              </Link>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1 shrink-0'>
            <ClockIcon className='size-5' />
            {getTranslation('modules.exercises.ExerciseDetailsPage.timeLimit')}:
          </div>
          <span className='font-medium'>0.2s</span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1 shrink-0'>
            <MicrochipIcon className='size-5' />
            {getTranslation('modules.exercises.ExerciseDetailsPage.memoryLimit')}:
          </div>
          <span className='font-medium'>64MB</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface ExerciseSubmissionProps {
  ref?: RefObject<HTMLDivElement | null>;
  exercise: Exercise;
}

function ExerciseSubmission({ ref, exercise }: ExerciseSubmissionProps) {
  const submissionFormRef = useRef<FormRef<Omit<CreateSubmissionPayload, 'exerciseId'>>>(null);
  const submissionResultRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useLocalStorage<'light' | 'vs-dark'>('MONACO_EDITOR_THEME', 'light');
  const [selectedLang, setSelectedLang] = useState(programmingLanguages[0]);
  const [runCodeResult, setRunCodeResult] = useState<RunCodeResult>();

  const { mutate: triggerRunCode, isPending: isRunningCode } = useMutation({
    mutationFn: (payload: Omit<CreateSubmissionPayload, 'exerciseId'>) =>
      submissionsService.runCode({
        exerciseId: exercise.id,
        ...payload,
      }),
    onSuccess: ({ data }) => {
      setRunCodeResult(data);
      setTimeout(() => {
        submissionResultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
  });

  const handleRunCode = async () => {
    await submissionFormRef.current?.submit();
    const payload = submissionFormRef.current?.getValues() as Required<
      Omit<CreateSubmissionPayload, 'exerciseId'>
    >;
    triggerRunCode(payload);
  };

  return (
    <>
      <Card className='exercise-submission pt-0 overflow-hidden' ref={ref}>
        <Form
          ref={submissionFormRef}
          schema={createSubmissionSchema.omit({ exerciseId: true })}
          fields={[
            {
              name: 'sourceCode',
              type: 'custom',
              controlRender: ({ field: { value, onChange } }) => (
                <CodeEditor
                  height='80vh'
                  language={selectedLang.editorValue}
                  theme={theme}
                  value={value}
                  onChange={onChange}
                />
              ),
              render: ({ Control, Message }) => (
                <>
                  <Control />
                  <Message />
                </>
              ),
            },
          ]}
          defaultValues={{
            sourceCode: '// code here\n',
            languageCode: programmingLanguages[0].id.toString(),
          }}
          renderSubmitButton={() => <></>}
          onErrorSubmit={console.log}
        />

        <CardFooter className='flex justify-end gap-2'>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => setTheme(theme === 'light' ? 'vs-dark' : 'light')}
            disabled={isRunningCode}
          >
            {theme === 'light' ? <SunIcon /> : <MoonIcon />}
          </Button>
          <ProgrammingLanguageSelect
            triggerClassName='w-60'
            value={selectedLang}
            onChange={(lang) => {
              submissionFormRef.current?.setValue('languageCode', lang.id.toString());
              setSelectedLang(lang);
            }}
            disabled={isRunningCode}
          />
          <Button variant='outline' onClick={handleRunCode} loading={isRunningCode}>
            <PlayIcon />
            {getTranslation('modules.exercises.ExerciseDetailsPage.runCode')}
          </Button>
          <Button variant='success' disabled={isRunningCode}>
            <SendIcon />
            {getTranslation('modules.exercises.ExerciseDetailsPage.submitCode')}
          </Button>
        </CardFooter>
      </Card>
      {runCodeResult && (
        <Card ref={submissionResultRef}>
          <CardHeader>
            <CardTitle
              className={cn('text-2xl', runCodeResult.allPassed ? 'text-success' : 'text-error')}
            >
              {runCodeResult.allPassed ? 'Congratulations!' : 'Some test cases did not pass!'}
            </CardTitle>
            <CardDescription>
              {runCodeResult.allPassed
                ? 'You have passed the sample test cases. Click the submit button to run your code against all the test cases.'
                : `${runCodeResult.passedTestCases}/${runCodeResult.totalTestCases} test cases passed.`}
            </CardDescription>
          </CardHeader>
          <CardContent className='pl-0'>
            <Tabs className='flex-row gap-8' defaultValue='test-case-1'>
              <TabsList className='flex-col h-full bg-transparent p-0'>
                {runCodeResult.results.map((result) => (
                  <TabsTrigger
                    key={`exercise-${exercise.id}-test-case-${result.testCaseIndex}`}
                    value={`test-case-${result.testCaseIndex}`}
                    className={cn(
                      'px-10 py-4 text-lg font-normal data-[state=active]:bg-accent rounded-l-none cursor-pointer',
                      result.passed ? 'text-success' : 'text-error'
                    )}
                  >
                    {result.passed ? (
                      <CheckIcon className='size-6' />
                    ) : (
                      <XIcon className='size-6' />
                    )}
                    Test case {result.testCaseIndex}
                  </TabsTrigger>
                ))}
              </TabsList>
              {runCodeResult.results.map((result) => (
                <TabsContent
                  key={`exercise-${exercise.id}-test-case-${result.testCaseIndex}-details`}
                  value={`test-case-${result.testCaseIndex}`}
                  className='overflow-hidden'
                >
                  <div className='flex justify-end gap-6'>
                    <div className='flex items-center gap-1.5'>
                      <ClockIcon />
                      <span>{result.time}s</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <MicrochipIcon />
                      <span>{result.memory}KB</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-8'>
                    <div className='space-y-1'>
                      <p className='text-sm'>Result</p>
                      <pre className='bg-accent p-2.5 w-full overflow-x-auto'>
                        <code>{result.status.description}</code>
                      </pre>
                    </div>
                    {result.compileOutput && (
                      <div className='space-y-1'>
                        <p className='text-sm'>Compiler Message</p>
                        <pre className='bg-accent p-2.5 w-full overflow-x-auto'>
                          <code>{result.compileOutput}</code>
                        </pre>
                      </div>
                    )}
                    {result.stderr && (
                      <div className='space-y-1'>
                        <p className='text-sm'>Error (stderr)</p>
                        <pre className='bg-accent p-2.5 w-full overflow-x-auto'>
                          <code>{result.stderr}</code>
                        </pre>
                      </div>
                    )}
                    {result.input && (
                      <div className='space-y-1'>
                        <p className='text-sm'>Input (stdin)</p>
                        <pre className='bg-accent p-2.5 overflow-x-auto'>
                          <code>{'2\n1 1'}</code>
                        </pre>
                      </div>
                    )}
                    {result.actualOutput && (
                      <div className='space-y-1'>
                        <p className='text-sm'>Your Output</p>
                        <pre className='bg-accent p-2.5 overflow-x-auto'>
                          <code>{result.actualOutput}</code>
                        </pre>
                      </div>
                    )}
                    {result.expectedOutput && (
                      <div className='space-y-1'>
                        <p className='text-sm'>Expected Output</p>
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
      )}
    </>
  );
}

export function ExerciseDetailsPageSkeleton() {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl'>
            <Skeleton className='w-[20ch] h-[1lh]' />
          </h1>
          <div className='flex gap-4'>
            <Button variant='error' disabled>
              <FlagTriangleRightIcon />
              {getTranslation('modules.exercises.ExerciseDetailsPage.report')}
            </Button>
            <Button variant='success' disabled>
              <SendIcon />
              {getTranslation('modules.exercises.ExerciseDetailsPage.submitCode')}
            </Button>
          </div>
        </div>
        <hr className='border-b border-border' />
        <Card>
          <CardContent className='flex gap-4 flex-col'>
            <article className='prose max-w-none'>
              <p>
                <Skeleton className='w-full h-[1lh]' />
              </p>
              <h3 className='text-accent1'>
                {getTranslation('modules.exercises.ExerciseDetailsPage.inputRequirements')}
              </h3>
              <ul>
                <li>
                  <Skeleton className='h-[1lh] w-[20ch]' />
                </li>
                <li>
                  <Skeleton className='h-[1lh] w-[33ch]' />
                </li>
                <li>
                  <Skeleton className='h-[1lh] w-[28ch]' />
                </li>
              </ul>
              <h3 className='text-accent1'>
                {getTranslation('modules.exercises.ExerciseDetailsPage.outputRequirements')}
              </h3>
              <ul>
                <li>
                  <Skeleton className='h-[1lh] w-[28ch]' />
                </li>
              </ul>
            </article>
          </CardContent>
        </Card>
      </section>
      <section className='col-span-1 flex flex-col gap-4'>
        <ExerciseExtraInfoSkeleton />
        <Button disabled>
          <ListChecks />
          {getTranslation('modules.exercises.ExerciseDetailsPage.allSubmissions')}
        </Button>
        <Button variant='success' disabled>
          <Trophy />
          {getTranslation('modules.exercises.ExerciseDetailsPage.bestSubmissions')}
        </Button>
      </section>
    </div>
  );
}

function ExerciseExtraInfoSkeleton() {
  return (
    <Card>
      <CardContent className='text-sm flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <UserIcon className='size-5' />
            {getTranslation('modules.exercises.ExerciseDetailsPage.author')}:
          </div>
          <div className='flex items-center gap-1.5'>
            <UserAvatarSkeleton className='size-6' />
            <span className='font-medium'>
              <Skeleton className='h-[1lh] w-[10ch]' />
            </span>
          </div>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-1'>
            <LayoutGridIcon className='size-5' />
            {getTranslation('modules.exercises.ExerciseDetailsPage.topics')}:
          </div>
          <div className='flex gap-1.5 flex-wrap'>
            <div className='text-xs'>
              <Skeleton className='w-[5ch] h-[1lh]' />
            </div>
            <div className='text-xs'>
              <Skeleton className='w-[8ch] h-[1lh]' />
            </div>
            <div className='text-xs'>
              <Skeleton className='w-[3ch] h-[1lh]' />
            </div>
            <div className='text-xs'>
              <Skeleton className='w-[12ch] h-[1lh]' />
            </div>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1 shrink-0'>
            <ClockIcon className='size-5' />
            {getTranslation('modules.exercises.ExerciseDetailsPage.timeLimit')}
          </div>
          <span className='font-medium'>
            <Skeleton className='w-[4ch] h-[1lh]' />
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1'>
            <MicrochipIcon className='size-5' />
            {getTranslation('modules.exercises.ExerciseDetailsPage.memoryLimit')}
          </div>
          <span className='font-medium'>
            <Skeleton className='w-[5ch] h-[1lh]' />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
