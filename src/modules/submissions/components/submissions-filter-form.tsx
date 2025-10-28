import { useNavigate } from '@tanstack/react-router';
import { CircleXIcon, FilterIcon } from 'lucide-react';
import { DeepPartial } from 'react-hook-form';

import { Button } from '@/base/components/ui/button';
import { Form, FormProps } from '@/base/components/ui/form';
import { programmingLanguages } from '@/base/components/ui/programming-language-select';
import { getTranslation } from '@/base/utils';
import { verdicts } from '@/modules/submissions/constants/verdicts.constant';
import {
  SubmissionsSearchParams,
  submissionsSearchParamsSchema,
} from '@/modules/submissions/types';

type SubmissionsFilterFormProps = Omit<
  FormProps<
    DeepPartial<Pick<SubmissionsSearchParams, 'status' | 'languageCode'>>,
    Pick<SubmissionsSearchParams, 'status' | 'languageCode'>
  >,
  'schema' | 'fields' | 'i18nNamespace' | 'renderSubmitButton'
> & {
  onClearSearch?: () => void;
};

export function SubmissionsFilterForm({ onSuccessSubmit, ...props }: SubmissionsFilterFormProps) {
  const navigate = useNavigate();

  const applySearchParams = ({
    status,
    languageCode,
  }: Pick<SubmissionsSearchParams, 'status' | 'languageCode'>) => {
    navigate({
      to: '.',
      search: (old) => ({
        ...old,
        status,
        languageCode,
      }),
    });
  };

  const clearSearchParams = () => {
    props.onClearSearch?.();
    navigate({
      to: '.',
      search: (old) => {
        const { status: _, languageCode: __, ...others } = old;
        return others;
      },
    });
  };

  return (
    <Form
      schema={submissionsSearchParamsSchema.pick({ status: true, languageCode: true })}
      i18nNamespace='modules.submissions.components.SubmissionsFilterForm'
      fields={[
        {
          name: 'status',
          type: 'select',
          async: false,
          multiple: true,
          clearable: true,
          options: Object.entries(verdicts)
            .slice(2)
            .map(([verdict, { shortName, description }]) => ({
              label: `${shortName} - ${description}`,
              value: verdict,
            })),
          getDisplayValue: (option) => option.label.split(' - ')[0],
          render: ({ Label, Control }) => (
            <>
              <Label />
              <Control />
            </>
          ),
        },
        {
          name: 'languageCode',
          type: 'select',
          async: false,
          multiple: true,
          clearable: true,
          options: programmingLanguages.map((lang) => ({
            label: lang.name,
            value: lang.id.toString(),
          })),
          render: ({ Label, Control }) => (
            <>
              <Label />
              <Control />
            </>
          ),
        },
      ]}
      renderSubmitButton={(SubmitButton) => (
        <div className='flex justify-end gap-2 w-full'>
          <Button type='button' variant='outline' onClick={() => clearSearchParams()}>
            <CircleXIcon />
            {getTranslation('modules.submissions.components.SubmissionsFilterForm.clearFilter')}
          </Button>
          <SubmitButton>
            <FilterIcon />{' '}
            {getTranslation(
              'modules.submissions.components.SubmissionsFilterForm.submitButtonLabel'
            )}
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
