import { createFileRoute, Outlet } from '@tanstack/react-router';

import { ScrollArea } from '@/base/components/ui/scroll-area';
import { Header } from '@/base/layouts/header';

export const Route = createFileRoute('/_authed/_students')({
  component: StudentsLayout,
});

function StudentsLayout() {
  const { user } = Route.useRouteContext();

  return (
    <>
      <Header user={user} />
      <ScrollArea className='w-full h-[calc(100vh-66px)]'>
        <main className='container mx-auto py-10'>
          <Outlet />
        </main>
      </ScrollArea>
    </>
  );
}
