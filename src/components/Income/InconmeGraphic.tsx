import { Doughnut, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import {
  GRAPHIC_BAR_DATA,
  GRAPHIC_OPTIONS,
  InconmeCategoryButtons,
} from "../../services/const";
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
  const isMobile = useMobile();
  
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

    setBonus(bonusExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0));
    setInvestemnt(
      investmentExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0),
    );
    setPaycheck(
      paycheckExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0),
    );
    setGift(giftExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0));
    setInterest(
      interestExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0),
    );
    setOther(otherExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0));
  }, [filteredInconmes]);

  const withResultsData = {
    labels: InconmeCategoryButtons.map((inconme) => inconme.text),
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
          style={{ height: "80%", width: "80%" }}
        />
      ) : (
        <Bar data={withResultsData} options={GRAPHIC_BAR_DATA} />
      )}
    </div>
  );
}

export default IncomeGraphic;
