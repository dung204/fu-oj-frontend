import {
  CircleQuestionMarkIcon,
  CopyIcon,
  FileInputIcon,
  FileOutputIcon,
  TriangleAlertIcon,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/base/components/ui/accordion';
import { Button } from '@/base/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/base/components/ui/card';
import { getTranslation } from '@/base/utils';
import { TestCase } from '@/modules/test-cases/types';

interface ExampleTestCaseCardProps {
  index: number;
  testCase: TestCase;
}

export function ExampleTestCaseCard({ index, testCase }: ExampleTestCaseCardProps) {
  return (
    <Card className='p-0 overflow-hidden gap-0 border-accent2'>
      <CardHeader className='bg-accent2 grid-rows-1 py-2 px-4'>
        <CardTitle className='flex items-center gap-1.5 text-white'>
          <CircleQuestionMarkIcon />
          Test case {index}
        </CardTitle>
      </CardHeader>
      <CardContent className='p-4'>
        <Accordion type='multiple' className='w-full flex flex-col gap-4'>
          <AccordionItem
            value='test-case-input'
            className='border-accent1 border rounded-lg overflow-hidden'
          >
            <AccordionTrigger className='py-2 px-4 bg-accent1 rounded-none text-white [&_svg]:text-white cursor-pointer'>
              <div className='flex gap-1.5 items-center'>
                <FileInputIcon className='size-5' />
                {getTranslation('modules.test-case.components.ExampleTestCaseCard.input')}
              </div>
            </AccordionTrigger>
            <AccordionContent className='flex justify-between p-4 text-base'>
              <pre>
                <code>{testCase.input}</code>
              </pre>
              <Button variant='ghost' size='icon' className='text-muted-foreground'>
                <CopyIcon />
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value='test-case-output'
            className='border-accent1 border! rounded-lg overflow-hidden'
          >
            <AccordionTrigger className='py-2 px-4 bg-accent1 rounded-none text-white [&_svg]:text-white cursor-pointer'>
              <div className='flex gap-1.5 items-center'>
                <FileOutputIcon className='size-5' />
                {getTranslation('modules.test-case.components.ExampleTestCaseCard.output')}
              </div>
            </AccordionTrigger>
            <AccordionContent className='flex justify-between p-4 text-base'>
              <pre>
                <code>{testCase.output}</code>
              </pre>
              <Button variant='ghost' size='icon' className='text-muted-foreground'>
                <CopyIcon />
              </Button>
            </AccordionContent>
          </AccordionItem>
          {testCase.note && (
            <AccordionItem
              value='test-case-note'
              className='border-warning border! rounded-lg overflow-hidden'
            >
              <AccordionTrigger className='py-2 px-4 bg-warning rounded-none text-white [&_svg]:text-white cursor-pointer'>
                <div className='flex gap-1.5 items-center'>
                  <TriangleAlertIcon className='size-5' />
                  {getTranslation('modules.test-case.components.ExampleTestCaseCard.note')}
                </div>
              </AccordionTrigger>
              <AccordionContent className='p-4 text-base'>
                <p>{testCase.note}</p>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}
