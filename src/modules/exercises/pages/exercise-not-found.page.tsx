import { Link } from '@tanstack/react-router';
import { FileCode2Icon } from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/base/components/ui/empty';
import { getTranslation } from '@/base/utils';

export function ExerciseNotFoundPage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon' className='size-40'>
          <FileCode2Icon className='size-1/2' />
        </EmptyMedia>
        <EmptyTitle>{getTranslation('modules.exercises.ExerciseNotFoundPage.title')}</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <Link to='/exercises'>
          <Button>
            {getTranslation('modules.exercises.ExerciseNotFoundPage.backToExercisesPage')}
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
