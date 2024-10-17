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
import { noResultsData } from "../../services/const";
import { StructureType } from "../../services/types";
import { useEffect, useState } from "react";

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
  const [isMobile, setIsMobile] = useState(false);

  const totalInconmeValue = filteredBalance
    .filter((inconme) => inconme.type === "inconme")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpensesValue = filteredBalance
    .filter((inconme) => inconme.type === "expenses")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const withResultsData = {
    labels: [true, false],
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

  const options = {
    cutout: "50%",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        maxHeight: 100,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    hover: {
      mode: null,
    },
  };

  const barOptions = {
    type: "bar",
    indexAxis: "x",
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          autoSkip: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    hover: {
      mode: null,
    },
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center p-5">
      {allZero ? (
        <Doughnut data={noResultsData} options={options} />
      ) : isMobile ? (
        <Doughnut
          data={withResultsData}
          options={options}
          style={{ height: "80%", width: "80%" }}
        />
      ) : (
        <Bar data={withResultsData} options={barOptions} />
      )}
    </div>
  );
}

export default BalanceGraphic;
