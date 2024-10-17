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

export function TimeGraphic({
  filteredItems,
}: {
  filteredItems: StructureType[];
}) {
  const sortedExpenses = filteredItems.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const lineChartData = {
    labels: sortedExpenses.map((item) => new Date(item.date)), // Convertir a Date si es necesario
    datasets: [
      {
        label: "Time Series Data",
        data: sortedExpenses.map((item) => item.amount),
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
          unit: "day", // Ajusta la unidad de tiempo
        },
      },
      y: {
        beginAtZero: true, // Comienza en 0 en el eje Y
      },
    },
    plugins: {
      legend: {
        display: false, // Oculta la leyenda si no es necesaria
      },
    },
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center p-3 sm:h-64 sm:w-64 md:p-0 lg:h-full lg:w-full">
      <Line data={lineChartData} options={lineChartOptions} />
    </div>
  );
}
