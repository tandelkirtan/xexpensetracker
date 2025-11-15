import { useContext } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ExpenseContext } from '../context/ExpenseContext';

// #endregion
const TinyBarChart = () => {

  const { list } = useContext(ExpenseContext)

  const categoryCounts = Array.from(
  list.reduce((map, item) => {
    return map.set(item.category, (map.get(item.category) || 0) + 1);
  }, new Map()),
  ([name, count]) => ({ name, count })
);

  return (
    <BarChart width={300} height={300} data={categoryCounts} layout="vertical">
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default TinyBarChart;