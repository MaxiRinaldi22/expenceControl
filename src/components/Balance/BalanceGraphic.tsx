import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { GRAPHIC_BAR_DATA, GRAPHIC_OPTIONS } from "../../services/const";
import { StructureType } from "../../services/types";
import { useMobile } from "../../hooks/useMobile";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

function BalanceGraphic({
  filteredBalance,
}: {
  filteredBalance: StructureType[];
}) {
  const totalInconmeValue = filteredBalance
    .filter((inconme) => inconme.type === "inconme")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpensesValue = filteredBalance
    .filter((inconme) => inconme.type === "expenses")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const isMobile = useMobile();

  const withResultsData = {
    labels: [],
    datasets: [
      {
        data: [totalInconmeValue, totalExpensesValue],
        backgroundColor: ["green", "red"],
        borderWidth: 0,
      },
    ],
  };

  const allZero = withResultsData.datasets[0].data.every(
    (value) => value === 0,
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center p-5">
      {allZero ? (
        <p className="font-semibold text-[#2b3f55]">No data available</p>
      ) : isMobile ? (
        <Doughnut
          data={withResultsData}
          options={GRAPHIC_OPTIONS}
          style={{ height: "60%", width: "60%" }}
        />
      ) : (
        <Bar data={withResultsData} options={GRAPHIC_BAR_DATA} />
      )}
    </div>
  );
}

export default BalanceGraphic;
