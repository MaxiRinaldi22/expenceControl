import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { noResultsData } from "../../services/const";
import { StructureType } from "../../services/types";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

function IncomeGraphic({
  filteredInconmes,
}: {
  filteredInconmes: StructureType[];
}) {
  const [paycheck, setPaycheck] = useState(0);
  const [gift, setGift] = useState(0);
  const [interest, setInterest] = useState(0);
  const [other, setOther] = useState(0);
  const [investemnt, setInvestemnt] = useState(0);
  const [bonus, setBonus] = useState(0);

  const totalInconmeValue = filteredInconmes.reduce(
    (acc, curr) => acc + curr.amount!,
    0,
  );

  useEffect(() => {
    const paycheckExpenses = filteredInconmes.filter(
      (inconme) => inconme.category === "Paycheck",
    );
    const giftExpenses = filteredInconmes.filter(
      (inconme) => inconme.category === "Gift",
    );
    const interestExpenses = filteredInconmes.filter(
      (inconme) => inconme.category === "Interest",
    );
    const otherExpenses = filteredInconmes.filter(
      (inconme) => inconme.category === "Other",
    );
    const investmentExpenses = filteredInconmes.filter(
      (inconme) => inconme.category === "Investment",
    );
    const bonusExpenses = filteredInconmes.filter(
      (inconme) => inconme.category === "Bonus",
    );

    setBonus(bonusExpenses.reduce((acc, curr) => acc + curr.amount, 0));
    setInvestemnt(
      investmentExpenses.reduce((acc, curr) => acc + curr.amount, 0),
    );
    setPaycheck(paycheckExpenses.reduce((acc, curr) => acc + curr.amount, 0));
    setGift(giftExpenses.reduce((acc, curr) => acc + curr.amount, 0));
    setInterest(interestExpenses.reduce((acc, curr) => acc + curr.amount, 0));
    setOther(otherExpenses.reduce((acc, curr) => acc + curr.amount, 0));
  }, [filteredInconmes]);

  const withResultsData = {
    labels: "",
    datasets: [
      {
        data: [paycheck, gift, interest, other, bonus, investemnt],
        backgroundColor: [
          "#3A86FF",
          "#5C3C92 ",
          "#2C6E49",
          "#F77F00",
          "#16A085",
          "#FF5733",
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
  if (totalInconmeValue >= 1000000) {
    showResult = (totalInconmeValue / 1000000).toFixed(1) + "M";
  } else if (totalInconmeValue >= 1000) {
    showResult = (totalInconmeValue / 1000).toFixed(1) + "K";
  } else {
    showResult = totalInconmeValue.toString();
  }

  return (
    <div className="relative mx-auto flex h-full w-full items-center justify-center">
      {allZero ? (
        <Doughnut data={noResultsData} options={options} />
      ) : (
        <Doughnut data={withResultsData} options={options} />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        {totalInconmeValue !== 0 ? (
          <h2 className="text-3xl font-semibold">${showResult}</h2>
        ) : (
          <h2 className="max-w-20 text-center text-lg font-[400]">
            No inconmes yet
          </h2>
        )}
      </div>
    </div>
  );
}

export default IncomeGraphic;
