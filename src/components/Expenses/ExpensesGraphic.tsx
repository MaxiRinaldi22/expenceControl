import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { noResultsData } from "../../services/const";
import { StructureType } from "../../services/types";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

function ExpensesGraphinc({ filteredExpenses } : { filteredExpenses: StructureType[] }) {
  const [health, setHealth] = useState(0);
  const [leisure, setLeisure] = useState(0);
  const [home, setHome] = useState(0);
  const [cafe, setCafe] = useState(0);
  const [education, setEducation] = useState(0);
  const [gifts, setGifts] = useState(0);
  const [groceries, setGroceries] = useState(0);

  const totalExpensesValue = filteredExpenses.reduce((acc, curr) => acc + curr.amount!, 0);
  
  useEffect(() => {
    const healthExpenses = filteredExpenses.filter((expense) => expense.category === "Health");
    const leisureExpenses = filteredExpenses.filter((expense) => expense.category === "Leisure");
    const homeExpenses = filteredExpenses.filter((expense) => expense.category === "Home");
    const cafeExpenses = filteredExpenses.filter((expense) => expense.category === "Cafe");
    const educationExpenses = filteredExpenses.filter((expense) => expense.category === "Education");
    const giftsExpenses = filteredExpenses.filter((expense) => expense.category === "Gifts");
    const groceriesExpenses = filteredExpenses.filter((expense) => expense.category === "Groceries");

    setHealth(healthExpenses.reduce((acc, curr) => acc + curr.amount, 0));
    setLeisure(leisureExpenses.reduce((acc, curr) => acc + curr.amount, 0));
    setHome(homeExpenses.reduce((acc, curr) => acc + curr.amount, 0));
    setCafe(cafeExpenses.reduce((acc, curr) => acc + curr.amount, 0));
    setEducation(educationExpenses.reduce((acc, curr) => acc + curr.amount, 0));
    setGifts(giftsExpenses.reduce((acc, curr) => acc + curr.amount, 0));
    setGroceries(groceriesExpenses.reduce((acc, curr) => acc + curr.amount, 0));
  }, [filteredExpenses]);

  const withResultsData = {
    labels: "",
    datasets: [
      {
        data: [health, leisure, home, cafe, education, gifts, groceries],
        backgroundColor: [
          "#D62828",
          "#16A085 ",
          "#3A86FF",
          "#F77F00",
          "#5C3C92  ",
          "#2C6E49",
          "#FF5733 ",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "60%",
  };

  const allZero = withResultsData.datasets[0].data.every(
    (value) => value === 0,
  );

  let showResult;
  if (totalExpensesValue >= 1000000) {
    showResult = (totalExpensesValue / 1000000).toFixed(1) + "M";
  } else if (totalExpensesValue >= 1000) {
    showResult = (totalExpensesValue / 1000).toFixed(1) + "K";
  } else {
    showResult = totalExpensesValue.toString();
  }

  return (
    <div className="relative mx-auto flex h-full w-full items-center justify-center">
      {allZero ? (
        <Doughnut data={noResultsData} options={options} />
      ) : (
        <Doughnut data={withResultsData} options={options} />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
      {totalExpensesValue !== 0 ? (
          <h2 className="text-2xl font-semibold">${showResult}</h2>
        ) : (
          <h2 className="max-w-20 text-center text-lg font-[400]">
            No expenses yet
          </h2>
        )}
      </div>
    </div>
  );
}

export default ExpensesGraphinc;
