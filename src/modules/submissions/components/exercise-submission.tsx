import CodeEditor from '@monaco-editor/react';
import { useMutation } from '@tanstack/react-query';
import { MoonIcon, PlayIcon, SendIcon, SunIcon } from 'lucide-react';
import { RefObject, useRef, useState } from 'react';

import { Button } from '@/base/components/ui/button';
import { Card, CardFooter } from '@/base/components/ui/card';
import { Form, FormRef } from '@/base/components/ui/form';
import {
  ProgrammingLanguageSelect,
  programmingLanguages,
} from '@/base/components/ui/programming-language-select';
import { useLocalStorage } from '@/base/hooks';
import { getTranslation } from '@/base/utils';
import { Exercise } from '@/modules/exercises/types';
import { RunCodeResultCard } from '@/modules/submissions/components/run-code-result-card';
import { SubmissionResultCard } from '@/modules/submissions/components/submission-result-card';
import { submissionsService } from '@/modules/submissions/services/submissions.service';
import {
  CreateSubmissionPayload,
  createSubmissionSchema,
  RunCodeResult,
  SubmissionResult,
} from '@/modules/submissions/types';

interface ExerciseSubmissionProps {
  ref?: RefObject<HTMLDivElement | null>;
  exercise: Exercise;
}

export function ExerciseSubmission({ ref, exercise }: ExerciseSubmissionProps) {
  const submissionFormRef = useRef<FormRef<Omit<CreateSubmissionPayload, 'exerciseId'>>>(null);
  const runCodeResultRef = useRef<HTMLDivElement>(null);
  const submissionResultRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useLocalStorage<'light' | 'vs-dark'>('MONACO_EDITOR_THEME', 'light');
  const [selectedLang, setSelectedLang] = useState(programmingLanguages[0]);
  const [runCodeResult, setRunCodeResult] = useState<RunCodeResult>();
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult>();

  const [runCodeResultCardVersion, setRunCodeResultCardVersion] = useState(0);
  const [submissionResultCardVersion, setSubmissionResultCardVersion] = useState(0);

  const { mutate: triggerRunCode, isPending: isRunningCode } = useMutation({
    mutationFn: (payload: Omit<CreateSubmissionPayload, 'exerciseId'>) =>
      submissionsService.runCode({
        exerciseId: exercise.id,
        ...payload,
      }),
    onSuccess: ({ data }) => {
      setRunCodeResult(data);
      setTimeout(() => {
        runCodeResultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
  });

  const { mutate: triggerSubmitCode, isPending: isSubmittingCode } = useMutation({
    mutationFn: (payload: Omit<CreateSubmissionPayload, 'exerciseId'>) =>
      submissionsService.submitCode({
        exerciseId: exercise.id,
        ...payload,
      }),
    onSuccess: ({ data }) => {
      setSubmissionResult(data);
      setTimeout(() => {
        submissionResultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
  });

  const handleRunCode = async () => {
    setRunCodeResultCardVersion((prev) => prev + 1);
    setSubmissionResult(undefined);
    setRunCodeResult(undefined);
    await submissionFormRef.current?.submit();
    const payload = submissionFormRef.current?.getValues() as Required<
      Omit<CreateSubmissionPayload, 'exerciseId'>
    >;
    triggerRunCode(payload);
  };

  const handleSubmitCode = async () => {
    setSubmissionResultCardVersion((prev) => prev + 1);
    setRunCodeResult(undefined);
    setSubmissionResult(undefined);
    await submissionFormRef.current?.submit();
    const payload = submissionFormRef.current?.getValues() as Required<
      Omit<CreateSubmissionPayload, 'exerciseId'>
    >;
    triggerSubmitCode(payload);
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
            disabled={isRunningCode || isSubmittingCode}
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
            disabled={isRunningCode || isSubmittingCode}
          />
          <Button
            variant='outline'
            disabled={isSubmittingCode}
            loading={isRunningCode}
            onClick={handleRunCode}
          >
            <PlayIcon />
            {getTranslation('modules.exercises.ExerciseDetailsPage.runCode')}
          </Button>
          <Button
            variant='success'
            disabled={isRunningCode}
            loading={isSubmittingCode}
            onClick={handleSubmitCode}
          >
            <SendIcon />
            {getTranslation('modules.exercises.ExerciseDetailsPage.submitCode')}
          </Button>
        </CardFooter>
      </Card>
      {runCodeResult && (
        <RunCodeResultCard
          key={runCodeResultCardVersion}
          runCodeResult={runCodeResult}
          ref={runCodeResultRef}
        />
      )}
      {submissionResult && (
        <SubmissionResultCard
          key={submissionResultCardVersion}
          exerciseId={exercise.id}
          submissionResult={submissionResult}
          ref={submissionResultRef}
        />
      )}
    </>
  );
}
