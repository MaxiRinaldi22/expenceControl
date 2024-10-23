import { Line } from "react-chartjs-2";
import {
  Chart,
  TimeScale,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { StructureType } from "../../services/types";

Chart.register(
  TimeScale,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

type TimeGraphicStructure = {
  amount: number | string;
  date: string;
  type: string;
};

export function TimeGraphic({
  filteredItems,
}: {
  filteredItems: StructureType[];
}) {
  const sortedItems: StructureType[] = filteredItems.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Reduce the itmes by the time and sum the amount
  const reduceItems: TimeGraphicStructure[] = Object.values(
    sortedItems.reduce(
      (
        acc: { [key: string]: TimeGraphicStructure },
        curr: TimeGraphicStructure,
      ) => {
        const date = curr.date.split("T")[0];

        if (!acc[date]) {
          acc[date] = { amount: 0, type: curr.type, date: date };
        }

        (acc[date].amount as number) += Number(curr.amount);
        return acc;
      },
      {},
    ),
  );

  const lineChartData = {
    labels: reduceItems.map((item) => item.date),
    datasets: [
      {
        label: "Time Series Data",
        data: reduceItems.map((item) => item.amount),
        borderColor: "#3A86FF",
        backgroundColor: "#3A86FF",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center p-3">
      {sortedItems.length === 0 ? (
        <p className="font-semibold text-[#2b3f55]">No data available</p>
      ) : reduceItems.length >= 3 ? (
        // @ts-expect-error ts(2322)
        <Line data={lineChartData} options={lineChartOptions} />
      ) : (
        <p className="font-semibold text-[#2b3f55]">No enaugh data</p>
      )}
    </div>
  );
}
