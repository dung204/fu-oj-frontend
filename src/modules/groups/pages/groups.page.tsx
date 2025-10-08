import { useNavigate } from '@tanstack/react-router';
import { CircleXIcon, GlobeIcon, LogInIcon, SearchIcon, UserIcon } from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/base/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/base/components/ui/dialog';
import { Input } from '@/base/components/ui/input';
import { InputOTP, InputOTPSlot } from '@/base/components/ui/input-otp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/base/components/ui/tabs';
import { PaginationSkeleton } from '@/base/layouts/pagination';
import { getTranslation } from '@/base/utils';
import { MyGroupsPage } from '@/modules/groups/pages/my-groups.page';
import { PublicGroupsPage } from '@/modules/groups/pages/public-groups.page';

import { GroupsSearchParams } from '../types';

interface GroupsPageProps {
  searchParams: GroupsSearchParams;
}

export function GroupsPage({ searchParams }: GroupsPageProps) {
  const navigate = useNavigate();

  const navigateToTab = (tab: GroupsSearchParams['tab']) => {
    navigate({
      to: '.',
      search: (old) => ({
        ...old,
        tab,
      }),
    });
  };

  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>{getTranslation('modules.groups.pages.GroupsPage.title')}</h1>
        <hr className='border-b border-border' />
        <Card>
          <CardContent>
            <Tabs defaultValue={searchParams.tab} className='gap-8'>
              <div className='flex items-center justify-between'>
                <TabsList>
                  <TabsTrigger
                    value='mine'
                    onClick={() => navigateToTab('mine')}
                    className='data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer'
                  >
                    <UserIcon />
                    {getTranslation('modules.groups.pages.GroupsPage.myGroups')}
                  </TabsTrigger>
                  <TabsTrigger
                    value='public'
                    onClick={() => navigateToTab('public')}
                    className='data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer'
                  >
                    <GlobeIcon />
                    {getTranslation('modules.groups.pages.GroupsPage.publicGroups')}
                  </TabsTrigger>
                </TabsList>
                <JoinGroupByCodeDialog />
              </div>
              <TabsContent value='mine'>
                <MyGroupsPage searchParams={searchParams} />
              </TabsContent>
              <TabsContent value='public'>
                <PublicGroupsPage searchParams={searchParams} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <PaginationSkeleton />
          </CardFooter>
        </Card>
      </section>
      <section className='col-span-1 flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <SearchIcon className='size-4' />{' '}
              {getTranslation('modules.groups.pages.GroupsPage.groupSearch')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Input
              placeholder={getTranslation('modules.groups.pages.GroupsPage.groupSearchPlaceholder')}
            />
          </CardContent>
          <CardFooter className='justify-end gap-2'>
            <Button type='button' variant='outline'>
              <CircleXIcon />
              {getTranslation('modules.groups.pages.GroupsPage.clearSearch')}
            </Button>
            <Button type='button'>
              <SearchIcon /> {getTranslation('modules.groups.pages.GroupsPage.applySearch')}
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

function JoinGroupByCodeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <LogInIcon />
          {getTranslation('modules.groups.pages.GroupsPage.JoinGroupByCodeDialog.buttonLabel')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {getTranslation('modules.groups.pages.GroupsPage.JoinGroupByCodeDialog.title')}
          </DialogTitle>
          <DialogDescription>
            {getTranslation('modules.groups.pages.GroupsPage.JoinGroupByCodeDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center'>
          <InputOTP maxLength={6}>
            <InputOTPSlot
              index={0}
              className='rounded-md text-4xl font-semibold p-8 border! border-primary'
            />
            <InputOTPSlot
              index={1}
              className='rounded-md text-4xl font-semibold p-8 border! border-primary'
            />
            <InputOTPSlot
              index={2}
              className='rounded-md text-4xl font-semibold p-8 border! border-primary'
            />
            <InputOTPSlot
              index={3}
              className='rounded-md text-4xl font-semibold p-8 border! border-primary'
            />
            <InputOTPSlot
              index={4}
              className='rounded-md text-4xl font-semibold p-8 border! border-primary'
            />
            <InputOTPSlot
              index={5}
              className='rounded-md text-4xl font-semibold p-8 border! border-primary'
            />
          </InputOTP>
        </div>
        <DialogFooter>
          <Button type='button'>
            {getTranslation(
              'modules.groups.pages.GroupsPage.JoinGroupByCodeDialog.submitButtonLabel'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function GroupsPageSkeleton({ searchParams }: GroupsPageProps) {
  const navigate = useNavigate();

  const navigateToTab = (tab: GroupsSearchParams['tab']) => {
    navigate({
      to: '.',
      search: (old) => ({
        ...old,
        tab,
      }),
    });
  };

  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>{getTranslation('modules.groups.pages.GroupsPage.title')}</h1>
        <hr className='border-b border-border' />
        <Card>
          <CardContent>
            <Tabs defaultValue={searchParams.tab}>
              <div className='flex items-center justify-between'>
                <TabsList>
                  <TabsTrigger
                    value='mine'
                    onClick={() => navigateToTab('mine')}
                    className='data-[state=active]:bg-primary data-[state=active]:text-white'
                  >
                    <UserIcon />
                    {getTranslation('modules.groups.pages.GroupsPage.myGroups')}
                  </TabsTrigger>
                  <TabsTrigger
                    value='public'
                    onClick={() => navigateToTab('public')}
                    className='data-[state=active]:bg-primary data-[state=active]:text-white'
                  >
                    <GlobeIcon />
                    {getTranslation('modules.groups.pages.GroupsPage.publicGroups')}
                  </TabsTrigger>
                </TabsList>
                <Button>
                  <LogInIcon />
                  {getTranslation('modules.groups.pages.GroupsPage.joinGroupByCode')}
                </Button>
              </div>
              <TabsContent value={searchParams.tab}>
                <p>{searchParams.tab === 'mine' ? 'My Groups' : 'Public Groups'}</p>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <PaginationSkeleton />
          </CardFooter>
        </Card>
      </section>
      <section className='col-span-1 flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <SearchIcon className='size-4' />{' '}
              {getTranslation('modules.groups.pages.GroupsPage.groupSearch')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Input
              placeholder={getTranslation('modules.groups.pages.GroupsPage.groupSearchPlaceholder')}
              disabled
            />
          </CardContent>
          <CardFooter className='justify-end gap-2'>
            <Button type='button' variant='outline' disabled>
              <CircleXIcon />
              {getTranslation('modules.groups.pages.GroupsPage.clearSearch')}
            </Button>
            <Button type='button' disabled>
              <SearchIcon /> {getTranslation('modules.groups.pages.GroupsPage.applySearch')}
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
