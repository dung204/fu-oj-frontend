import { useNavigate } from '@tanstack/react-router';
import { CircleXIcon, SearchIcon } from 'lucide-react';
import { DeepPartial } from 'react-hook-form';

import { Button } from '@/base/components/ui/button';
import { Form, FormProps } from '@/base/components/ui/form';
import { getTranslation } from '@/base/utils';
import { ExercisesSearchParams, exercisesSearchParamsSchema } from '@/modules/exercises/types';
import { getTopicsAsyncSelectOptions } from '@/modules/topics/utils/topics-async-select-options.util';

type ExercisesFilterFormProps = Omit<
  FormProps<
    DeepPartial<Pick<ExercisesSearchParams, 'query' | 'topic'>>,
    Pick<ExercisesSearchParams, 'query' | 'topic'>
  >,
  'schema' | 'fields' | 'i18nNamespace' | 'renderSubmitButton'
> & {
  onClearSearch?: () => void;
};

export function ExercisesFilterForm({ onSuccessSubmit, ...props }: ExercisesFilterFormProps) {
  const navigate = useNavigate();

  const applySearchParams = ({ query, topic }: Pick<ExercisesSearchParams, 'query' | 'topic'>) => {
    navigate({
      to: '.',
      search: {
        query,
        topic,
      },
    });
  };

  const clearSearchParams = () => {
    props.onClearSearch?.();
    navigate({
      to: '.',
      search: {},
    });
  };

  return (
    <Form
      schema={exercisesSearchParamsSchema.pick({ query: true, topic: true })}
      i18nNamespace='modules.exercises.components.ExercisesFilterForm'
      fields={[
        {
          name: 'query',
          type: 'text',
          render: ({ Control }) => <Control />,
        },
        {
          name: 'topic',
          type: 'select',
          async: true,
          ...getTopicsAsyncSelectOptions('name'),
        },
      ]}
      renderSubmitButton={(SubmitButton) => (
        <div className='flex justify-end gap-2 w-full'>
          <Button type='button' variant='outline' onClick={() => clearSearchParams()}>
            <CircleXIcon />
            {getTranslation('modules.exercises.components.ExercisesFilterForm.clearSearch')}
          </Button>
          <SubmitButton>
            <SearchIcon />{' '}
            {getTranslation('modules.exercises.components.ExercisesFilterForm.submitButtonLabel')}
          </SubmitButton>
        </div>
      )}
      onSuccessSubmit={(params) => {
        applySearchParams(params);
        onSuccessSubmit?.(params);
      }}
      {...props}
    />
  );
}
