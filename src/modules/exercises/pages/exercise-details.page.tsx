import {
  CircleQuestionMarkIcon,
  ClockIcon,
  CopyIcon,
  FileInputIcon,
  FileOutputIcon,
  FlagTriangleRightIcon,
  LayoutGridIcon,
  ListChecks,
  MicrochipIcon,
  SendIcon,
  TriangleAlertIcon,
  Trophy,
  UserIcon,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/base/components/ui/accordion';
import { Badge } from '@/base/components/ui/badge';
import { Button } from '@/base/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/base/components/ui/card';
import { UserAvatarSkeleton } from '@/modules/users/components/user-avatar';

interface ExerciseDetailsPageProps {
  exerciseId: string;
}

export function ExerciseDetailsPage(_: ExerciseDetailsPageProps) {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl'>Exercise Title</h1>
          <div className='flex gap-4'>
            <Button variant='error'>
              <FlagTriangleRightIcon />
              Report
            </Button>
            <Button variant='success'>
              <SendIcon />
              Submit
            </Button>
          </div>
        </div>
        <hr className='border-b border-border' />
        <Card>
          <CardContent className='flex gap-4 flex-col'>
            <article className='prose max-w-none'>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea dolorum eos illo iure
                corrupti ipsam ducimus inventore placeat incidunt, vero ipsum neque sapiente error?
                Nobis, veniam. Nisi dolorum quibusdam incidunt, eos voluptates dolor, eligendi nihil
                eaque fugiat quas sed temporibus. Sunt alias quibusdam necessitatibus maxime,
                facilis nesciunt saepe ab totam?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda illo ab
                distinctio sit ea sequi quas nulla explicabo vitae accusantium natus suscipit minima
                ducimus obcaecati, eum earum ullam! Corporis, quibusdam?
              </p>
              <h3 className='text-accent1'>Input</h3>
              <ul>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, inventore?</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              </ul>
              <h3 className='text-accent1'>Output</h3>
              <ul>
                <li>Lorem ipsum dolor sit amet.</li>
              </ul>
              <h3 className='text-accent1'>Example</h3>
            </article>
            <Card className='p-0 overflow-hidden gap-0 border-accent2'>
              <CardHeader className='bg-accent2 grid-rows-1 py-2 px-4'>
                <CardTitle className='flex items-center gap-1.5 text-white'>
                  <CircleQuestionMarkIcon />
                  Test case 1
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
                        <FileInputIcon className='size-5' /> Input
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='flex justify-between p-4 text-base'>
                      <pre>
                        <code>5{'\n'}1 2 3 4 5</code>
                      </pre>
                      <Button variant='ghost' size='icon' className='text-muted-foreground'>
                        <CopyIcon />
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value='test-case-output'
                    className='border-accent1 border rounded-lg overflow-hidden'
                  >
                    <AccordionTrigger className='py-2 px-4 bg-accent1 rounded-none text-white [&_svg]:text-white cursor-pointer'>
                      <div className='flex gap-1.5 items-center'>
                        <FileOutputIcon className='size-5' /> Output
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='flex justify-between p-4 text-base'>
                      <pre>
                        <code>15</code>
                      </pre>
                      <Button variant='ghost' size='icon' className='text-muted-foreground'>
                        <CopyIcon />
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value='test-case-note'
                    className='border-warning border! rounded-lg overflow-hidden'
                  >
                    <AccordionTrigger className='py-2 px-4 bg-warning rounded-none text-white [&_svg]:text-white cursor-pointer'>
                      <div className='flex gap-1.5 items-center'>
                        <TriangleAlertIcon className='size-5' /> Note
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='p-4 text-base'>
                      <p>The result is the sum of all the number in line 2</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </section>
      <section className='col-span-1 flex flex-col gap-4'>
        <ExercisesExtraInfo />
        <Button>
          <ListChecks />
          All submissions
        </Button>
        <Button variant='success'>
          <Trophy />
          Best submissions
        </Button>
      </section>
    </div>
  );
}

function ExercisesExtraInfo() {
  return (
    <Card>
      <CardContent className='text-sm flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <UserIcon className='size-5' />
            Author:
          </div>
          <div className='flex items-center gap-1.5'>
            <UserAvatarSkeleton className='size-6' />
            <span className='font-medium'>Lorem, ipsum.</span>
          </div>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-1'>
            <LayoutGridIcon className='size-5' />
            Topics:
          </div>
          <div className='flex gap-1.5 flex-wrap'>
            <Badge variant='success' className='cursor-pointer'>
              Lorem.
            </Badge>
            <Badge className='cursor-pointer'>Lorem, ipsum.</Badge>
            <Badge variant='warning' className='cursor-pointer'>
              Lorem, ipsum.
            </Badge>
            <Badge className='cursor-pointer'>Lorem.</Badge>
            <Badge variant='warning' className='cursor-pointer'>
              Lorem.
            </Badge>
            <Badge variant='success' className='cursor-pointer'>
              Lorem, ipsum.
            </Badge>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1'>
            <ClockIcon className='size-5' />
            Time limit:
          </div>
          <span className='font-medium'>0.2s</span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1'>
            <MicrochipIcon className='size-5' />
            Memory limit:
          </div>
          <span className='font-medium'>64MB</span>
        </div>
      </CardContent>
    </Card>
  );
}
