import { createFileRoute } from '@tanstack/react-router';

import { getTranslation } from '@/base/utils';

export const Route = createFileRoute('/_authed/groups/$groupId/dashboard/')({
  component: RouteComponent,
  head: ({ match }) => ({
    meta: [
      {
        title: `${
          !match.context.group
            ? getTranslation('modules.groups.pages.GroupNotFoundPage.pageTitle')
            : getTranslation('modules.groups.pages.GroupDashboardPage.title', {
                groupName: match.context.group.name,
              })
        } | FPT University Online Judge`,
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/_authed/groups/$groupId/dashboard/"!</div>;
}
