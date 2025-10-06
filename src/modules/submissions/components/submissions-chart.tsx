import { Label, Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/base/components/ui/chart';
import { getTranslation } from '@/base/utils';

const chartData = [
  { result: 'ac', submissions: 200, fill: 'var(--color-ac)' },
  { result: 'wa', submissions: 200, fill: 'var(--color-wa)' },
  { result: 'tle', submissions: 200, fill: 'var(--color-tle)' },
  { result: 'mle', submissions: 200, fill: 'var(--color-mle)' },
  { result: 'rte', submissions: 200, fill: 'var(--color-rte)' },
  { result: 'ir', submissions: 200, fill: 'var(--color-ir)' },
  { result: 'ce', submissions: 200, fill: 'var(--color-ce)' },
];

const chartConfig = {
  ac: {
    label: 'AC',
    color: 'var(--success)',
  },
  wa: {
    label: 'WA',
    color: 'var(--error)',
  },
  tle: {
    label: 'TLE',
    color: 'rgb(255, 165, 0)', // orange
  },
  mle: {
    label: 'MLE',
    color: 'rgb(255, 0, 0)', // red
  },
  rte: {
    label: 'RTE',
    color: 'rgb(128, 0, 128)', // purple
  },
  ir: {
    label: 'IR',
    color: 'rgb(0, 0, 255)', // blue
  },
  ce: {
    label: 'CE',
    color: 'rgb(0, 0, 0)',
  },
} satisfies ChartConfig;

export function SubmissionsChart() {
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
                      0
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
