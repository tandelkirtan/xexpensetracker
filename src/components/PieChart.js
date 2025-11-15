import { useContext } from 'react';
import { Legend, Cell, Pie, PieChart, PieLabelRenderProps } from 'recharts';
import { ExpenseContext } from '../context/ExpenseContext';

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  
  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartWithCustomizedLabel({ isAnimationActive = true }: { isAnimationActive?: boolean }) {

  const { list } = useContext(ExpenseContext)

  const result = Array.from(
  list.reduce((map, item) => {
    const price = parseInt(item.price);
    return map.set(item.category, (map.get(item.category) || 0) + price);
  }, new Map()),
  ([name, value]) => ({ name, value })
);

console.log(result);

  return (
    <PieChart style={{ width: '100%', maxWidth: '350px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
      <Pie
        data={result}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value" 
        isAnimationActive={isAnimationActive}
      >
        {result.map((entry, index) => (
          <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  );
}
