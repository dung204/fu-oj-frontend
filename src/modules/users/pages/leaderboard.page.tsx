import { useNavigate, useRouterState } from '@tanstack/react-router';
import { CircleXIcon, SearchIcon, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardFooter } from '@/base/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/base/components/ui/input-group';
import { Separator } from '@/base/components/ui/separator';
import { useDebounce } from '@/base/hooks';
import { PaginationSkeleton } from '@/base/layouts/pagination';
import { getTranslation } from '@/base/utils';
import {
  LeaderboardTable,
  LeaderboardTableSkeleton,
} from '@/modules/users/components/leaderboard-table';

export function LeaderboardPage() {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl'>{getTranslation('modules.users.pages.LeaderboardPage.title')}</h1>
        <LeaderboardSearchBox />
      </div>
      <hr className='border-b border-border' />
      <Card>
        <CardContent className='flex flex-col gap-8'>
          <div className='flex justify-center items-end gap-12 mt-16'>
            <Card className='w-[250px] shadow-xl bg-[rgb(220,220,220)]'>
              <CardContent className='flex flex-col items-center'>
                <div className='rounded-full flex items-center justify-center size-20 bg-accent z-20 border'>
                  <UserIcon className='size-10' />
                </div>
                <img
                  src='/second-medal.svg'
                  alt='Second Place Medal'
                  className='w-20 z-10 relative bottom-5'
                />
                <h2 className='text-2xl font-semibold'>2nd Student</h2>
                <div className='flex space-x-4 items-center mt-4 h-20'>
                  <div className='flex flex-col items-center gap-2'>
                    <p>{getTranslation('modules.users.pages.LeaderboardPage.pillars.accepted')}:</p>
                    <p className='text-4xl font-semibold'>--</p>
                  </div>
                  <Separator orientation='vertical' className='bg-muted-foreground' />
                  <div className='flex flex-col items-center gap-2'>
                    <p>
                      {getTranslation('modules.users.pages.LeaderboardPage.pillars.submitted')}:
                    </p>
                    <p className='text-4xl font-semibold'>--</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className='w-[250px] shadow-xl bg-yellow-300 -translate-y-10'>
              <CardContent className='flex flex-col items-center relative'>
                <div className='rounded-full flex items-center justify-center size-20 bg-accent z-20 border'>
                  <UserIcon className='size-10' />
                </div>
                <img
                  src='/first-medal.svg'
                  alt='First Place Medal'
                  className='w-20 z-10 relative bottom-5'
                />
                <h2 className='text-2xl font-semibold'>1st Student</h2>
                <div className='flex space-x-4 items-center mt-4 h-20'>
                  <div className='flex flex-col items-center gap-2'>
                    <p>{getTranslation('modules.users.pages.LeaderboardPage.pillars.accepted')}:</p>
                    <p className='text-4xl font-semibold'>--</p>
                  </div>
                  <Separator orientation='vertical' className='bg-muted-foreground' />
                  <div className='flex flex-col items-center gap-2'>
                    <p>
                      {getTranslation('modules.users.pages.LeaderboardPage.pillars.submitted')}:
                    </p>
                    <p className='text-4xl font-semibold'>--</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className='w-[250px] shadow-xl bg-[rgb(205,127,50)]'>
              <CardContent className='flex flex-col items-center relative'>
                <div className='rounded-full flex items-center justify-center size-20 bg-accent z-20 border'>
                  <UserIcon className='size-10' />
                </div>
                <img
                  src='/third-medal.svg'
                  alt='Third Place Medal'
                  className='w-20 z-10 relative bottom-5'
                />
                <h2 className='text-2xl font-semibold'>3rd Student</h2>
                <div className='flex space-x-4 items-center mt-4 h-20'>
                  <div className='flex flex-col items-center gap-2'>
                    <p>{getTranslation('modules.users.pages.LeaderboardPage.pillars.accepted')}:</p>
                    <p className='text-4xl font-semibold'>--</p>
                  </div>
                  <Separator orientation='vertical' className='bg-muted-foreground' />
                  <div className='flex flex-col items-center gap-2'>
                    <p>
                      {getTranslation('modules.users.pages.LeaderboardPage.pillars.submitted')}:
                    </p>
                    <p className='text-4xl font-semibold'>--</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <LeaderboardTable />
        </CardContent>
        <CardFooter>
          <PaginationSkeleton />
        </CardFooter>
      </Card>
    </section>
  );
}

export function LeaderboardPageSkeleton() {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl'>{getTranslation('modules.users.pages.LeaderboardPage.title')}</h1>
        <LeaderboardSearchBox />
      </div>
      <hr className='border-b border-border' />
      <Card>
        <CardContent>
          <LeaderboardTableSkeleton />
        </CardContent>
        <CardFooter>
          <PaginationSkeleton />
        </CardFooter>
      </Card>
    </section>
  );
}

function LeaderboardSearchBox() {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm !== '') {
      navigate({
        to: pathname,
        search: {
          q: debouncedSearchTerm,
        },
      });
      return;
    }

    navigate({
      to: pathname,
      search: {},
    });
  }, [debouncedSearchTerm, navigate, pathname]);

  return (
    <InputGroup className='max-w-sm'>
      <InputGroupInput
        placeholder={getTranslation(
          'modules.users.pages.LeaderboardPage.LeaderboardSearchBox.placeholder'
        )}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      {searchTerm && (
        <InputGroupAddon align='inline-end'>
          <CircleXIcon className='cursor-pointer' onClick={() => setSearchTerm('')} />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
