import { useRouter } from '@tanstack/react-router';

import {
  Pagination as PaginationComp,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/base/components/ui/pagination';
import { cn } from '@/base/lib';
import { Pagination as PaginationType } from '@/base/types';

interface PaginationProps {
  pagination: PaginationType;
}

export function Pagination({ pagination }: PaginationProps) {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  const navigateToPrevPage = () => {
    if (!pagination.hasPreviousPage) return;

    router.navigate({
      to: pathname,
      search: (search) => ({
        ...search,
        page: pagination.currentPage - 1,
      }),
    });
  };

  const navigateToNextPage = () => {
    if (!pagination.hasNextPage) return;

    router.navigate({
      to: pathname,
      search: (search) => ({
        ...search,
        page: pagination.currentPage + 1,
      }),
    });
  };

  const navigateToPage = (page: number) => {
    router.navigate({
      to: pathname,
      search: (search) => ({
        ...search,
        page,
      }),
    });
  };

  return (
    <PaginationComp>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn({
              'pointer-events-none opacity-50': !pagination.hasPreviousPage,
            })}
            onClick={() => navigateToPrevPage()}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={pagination.currentPage !== 1 ? () => navigateToPage(1) : undefined}
            isActive={pagination.currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
        {pagination.currentPage - 1 > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pagination.currentPage > 1 && pagination.currentPage < pagination.totalPage && (
          <PaginationItem>
            <PaginationLink isActive={true}>{pagination.currentPage}</PaginationLink>
          </PaginationItem>
        )}
        {pagination.totalPage - pagination.currentPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pagination.totalPage > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => navigateToPage(pagination.totalPage)}
              isActive={pagination.currentPage === pagination.totalPage}
            >
              {pagination.totalPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={cn({
              'pointer-events-none opacity-50': !pagination.hasNextPage,
            })}
            onClick={() => navigateToNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComp>
  );
}

export function PaginationSkeleton() {
  return (
    <PaginationComp>
      <PaginationContent>
        <PaginationItem className='pointer-events-none text-muted-foreground'>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem className='pointer-events-none text-muted-foreground'>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem className='pointer-events-none text-muted-foreground'>
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem className='pointer-events-none text-muted-foreground'>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem className='pointer-events-none text-muted-foreground'>
          <PaginationEllipsis className='text-muted-foreground' />
        </PaginationItem>
        <PaginationItem className='pointer-events-none text-muted-foreground'>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComp>
  );
}
