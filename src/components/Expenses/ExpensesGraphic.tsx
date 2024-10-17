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
import { useEffect, useState } from "react";
import { ExpensesCategoryButtons, noResultsData } from "../../services/const";
import { StructureType } from "../../services/types";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

function ExpensesGraphinc({
  filteredExpenses,
}: {
  filteredExpenses: StructureType[];
}) {
  const [health, setHealth] = useState(0);
  const [leisure, setLeisure] = useState(0);
  const [home, setHome] = useState(0);
  const [cafe, setCafe] = useState(0);
  const [education, setEducation] = useState(0);
  const [gifts, setGifts] = useState(0);
  const [groceries, setGroceries] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const healthExpenses = filteredExpenses.filter(
      (expense) => expense.category === "Health",
    );
    const leisureExpenses = filteredExpenses.filter(
      (expense) => expense.category === "Leisure",
    );
    const homeExpenses = filteredExpenses.filter(
      (expense) => expense.category === "Home",
    );
    const cafeExpenses = filteredExpenses.filter(
      (expense) => expense.category === "Cafe",
    );
    const educationExpenses = filteredExpenses.filter(
      (expense) => expense.category === "Education",
    );
    const giftsExpenses = filteredExpenses.filter(
      (expense) => expense.category === "Gifts",
    );
    const groceriesExpenses = filteredExpenses.filter(
      (expense) => expense.category === "Groceries",
    );

    setHealth(
      healthExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0),
    );
    setLeisure(
      leisureExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0),
    );
    setHome(homeExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0));
    setCafe(cafeExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0));
    setEducation(
      educationExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0),
    );
    setGifts(giftsExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0));
    setGroceries(
      groceriesExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0),
    );
  }, [filteredExpenses]);

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
    labels: ExpensesCategoryButtons.map((expense) => expense.text),
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

  const allZero = withResultsData.datasets[0].data.every(
    (value) => value === 0,
  );

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

export default ExpensesGraphinc;
