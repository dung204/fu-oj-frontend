import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  ClockIcon,
  FlagTriangleRightIcon,
  LayoutGridIcon,
  ListChecks,
  MicrochipIcon,
  SendIcon,
  Trophy,
  UserIcon,
} from 'lucide-react';
import { useRef } from 'react';

import { Badge } from '@/base/components/ui/badge';
import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';
import { Skeleton } from '@/base/components/ui/skeleton';
import { getTranslation } from '@/base/utils';
import { exercisesService } from '@/modules/exercises/services/exercises.service';
import { Exercise } from '@/modules/exercises/types';
import { ExerciseSubmission } from '@/modules/submissions/components/exercise-submission';
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
              <Link key={`${topic.id}-link`} to='/exercises' search={{ topic: topic.id }}>
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
