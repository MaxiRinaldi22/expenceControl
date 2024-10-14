import { useState } from "react";
import { Bank, Bonus, Gift, HandCoin, Investemnt, Question } from "../icons";
import { InconmeCategoryButtons } from "../../services/const";
import {
  AddComponent,
  AddInput,
  BackArrow,
  SelectDate,
} from "../Components";
import useBalanceContext from "../../hooks/useBalanceContext";
import useInconmeContext from "../../hooks/useInconmeContext";

function AddIncome({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { balance, setBalance } = useBalanceContext();
  const { inconmes, setInconmes } = useInconmeContext();
  const [amount, setAmount] = useState<number | string>(0);
  const [category, setCategory] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [date, setDate] = useState("");
  const type = "inconme";

  const [selectedCategory, setSelectedCategory] = useState(
    Array(7).fill(false),
  );

  const handleAddIncome = () => {
    setBalance([{ amount, category, backgroundColor, type, date }, ...balance]);
    setInconmes([
      { amount, category, backgroundColor, type, date },
      ...inconmes,
    ]);

    setOpen(false);
  };

  const handleCatergorySelect = (
    text: string,
    background: string,
    id: number,
  ) => {
    setCategory(text);
    setBackgroundColor(background);

    setSelectedCategory(Array(7).fill(false));
    setSelectedCategory((prev) => {
      const newSelected = [...prev];
      newSelected[id] = !newSelected[id];
      return newSelected;
    });
  };

  return (
    <AddComponent>
      <BackArrow setOpen={setOpen} />
      <div className="flex h-full flex-col items-center justify-between px-5 pb-4 pt-2">
        <AddInput amount={amount} setAmount={setAmount} />
        <div className="grid w-full grid-cols-4 gap-2">
          {InconmeCategoryButtons.map((category, id: number) => (
            <button
              key={category.id}
              style={selectedCategory[id] ? { background: "#001D3D" } : {}}
              className="flex w-full transform flex-col items-center justify-center gap-1 rounded-md p-2 transition-transform duration-300 will-change-transform hover:scale-110"
              onClick={() =>
                handleCatergorySelect(category.text, category.background, id)
              }
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold"
                style={{
                  background: category.background,
                }}
              >
                {category.text === "Paycheck" && <HandCoin width={32} />}
                {category.text === "Gift" && <Gift width={32} />}
                {category.text === "Interest" && <Bank width={32} />}
                {category.text === "Other" && <Question width={32} />}
                {category.text === "Investment" && <Investemnt width={32} />}
                {category.text === "Bonus" && <Bonus width={32} />}
              </div>
              <p className="text-xs font-semibold text-white">
                {" "}
                {category.text}
              </p>
            </button>
          ))}
        </div>
        <SelectDate setDate={setDate} />
        <button
          onClick={handleAddIncome}
          className="h-9 w-40 rounded-xl bg-[#FFC300] text-xl font-semibold"
          disabled={amount === 0 || amount === "" || category === ""}
        >
          Add
        </button>
      </div>
    </AddComponent>
  );
}

export default AddIncome;
