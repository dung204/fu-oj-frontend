import { useSuspenseQuery } from '@tanstack/react-query';
import { Label, Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/base/components/ui/chart';
import { getTranslation } from '@/base/utils';
import { verdicts } from '@/modules/submissions/constants/verdicts.constant';
import { SubmissionsSearchParams } from '@/modules/submissions/types';
import { submissionStatisticsQueryOptions } from '@/modules/submissions/utils/submission-statistics-query-options.util';

const chartConfig = Object.fromEntries(
  Object.values(verdicts)
    .slice(2)
    .map((key) => [
      key.shortName.toLowerCase(),
      {
        label: key.shortName,
        color: key.color,
      },
    ])
) as ChartConfig;

interface SubmissionsChartProps {
  searchParams: Omit<SubmissionsSearchParams, 'page' | 'pageSize' | 'order'>;
}

export function SubmissionsChart({ searchParams }: SubmissionsChartProps) {
  const {
    data: {
      data: { totalCount, ...statuses },
    },
  } = useSuspenseQuery(submissionStatisticsQueryOptions(searchParams));

  const chartData = Object.entries(statuses).map(([status, count]) => ({
    result: verdicts[status as keyof typeof verdicts].shortName.toLowerCase(),
    submissions: count,
    fill: `var(--color-${verdicts[status].shortName.toLowerCase()})`,
  }));

  return (
    <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={chartData}
          dataKey='submissions'
          nameKey='result'
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className='fill-foreground text-3xl font-bold'
                    >
                      {totalCount}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className='fill-muted-foreground'
                    >
                      {getTranslation('modules.submissions.components.SubmissionsChart.label')}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
