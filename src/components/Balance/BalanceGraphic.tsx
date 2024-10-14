import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { noResultsData } from "../../services/const";
import { StructureType } from "../../services/types";


ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

function BalanceGraphic({filteredBalance} : {filteredBalance: StructureType[]}) {

  const totalInconmeValue = filteredBalance.filter((inconme) => inconme.type === "inconme").reduce((acc, curr) => acc + curr.amount!, 0);
  const totalExpensesValue = filteredBalance.filter((inconme) => inconme.type === "expenses").reduce((acc, curr) => acc + curr.amount!, 0);
  
  const withResultsData = {
    labels: '',
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
    cutout: "60%",
  };

  const totalValue = totalInconmeValue - totalExpensesValue;

  let showResult;
  if (totalExpensesValue >= 1000000) {
    showResult = (totalValue / 1000000).toFixed(1) + "M";
  } else if (totalValue >= 1000) {
    showResult = (totalValue / 1000).toFixed(1) + "K";
  } else {
    showResult = totalValue.toString();
  }

  return (
    <div className="relative mx-auto flex h-full w-full items-center justify-center">
      {allZero ? (
        <Doughnut data={noResultsData} options={options} />
      ) : (
        <Doughnut data={withResultsData} options={options} />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
      {totalExpensesValue !== 0 || totalInconmeValue !== 0 ? (
          <h2 className="text-3xl font-semibold">${showResult}</h2>
        ) : (
          <h2 className="max-w-20 text-center text-lg font-[400]">
            Not enough info yet
          </h2>
        )}
      </div>
    </div>
  );
}

export default BalanceGraphic;
