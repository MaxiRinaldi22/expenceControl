import { useEffect, useState } from "react";
import { ExpensesCategoryButtons } from "../../services/const";
import { AddComponent } from "../ui/AddComponent";
import {
  Cafe,
  Education,
  Gift,
  Groceries,
  Helath,
  Home,
  Leisure,
} from "../icons";
import useExpensesContext from "../../hooks/useExpensesContext";
import useBalanceContext from "../../hooks/useBalanceContext";
import { SelectDate } from "../ui/SelectDate";
import { AddInput } from "../ui/AddInput";
import { BackArrow } from "../ui/BackArrow";
import { HeaderTotalValue } from "../ui/HeaderTotalValue";

export function AddExpenses({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { balance, setBalance } = useBalanceContext();
  const { expenses, setExpenses } = useExpensesContext();

  const [amount, setAmount] = useState<number | string>(0);
  const [category, setCategory] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [date, setDate] = useState("");
  const type = "expenses";

  const [disableButton, setDisableButton] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    Array(7).fill(false),
  );

  const handleAddExpenses = () => {
    setBalance([{ amount, category, backgroundColor, type, date }, ...balance]);
    setExpenses([
      { amount, category, backgroundColor, type, date },
      ...expenses,
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

  useEffect(() => {
    if (amount === 0 || amount === "" || category === "" || date === "") {
      setDisableButton(true);
    } else if (
      Number(amount) > 0 &&
      amount !== "" &&
      category !== "" &&
      date !== ""
    ) {
      setDisableButton(false);
    }
  }, [amount, category, date]);

  return (
      <AddComponent>
        <BackArrow setOpen={setOpen} />
        <div className="flex h-full flex-col items-center justify-between px-5 pb-4 pt-2">
          <AddInput amount={amount} setAmount={setAmount} />
          <div className="grid w-full grid-cols-4 gap-2">
            {ExpensesCategoryButtons.map((category, id: number) => (
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
                  {category.text === "Health" && <Helath width={32} />}
                  {category.text === "Leisure" && <Leisure width={32} />}
                  {category.text === "Home" && <Home width={32} />}
                  {category.text === "Cafe" && <Cafe width={32} />}
                  {category.text === "Education" && <Education width={32} />}
                  {category.text === "Gifts" && <Gift width={32} />}
                  {category.text === "Groceries" && <Groceries width={32} />}
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
            disabled={disableButton}
            onClick={handleAddExpenses}
            className="h-9 w-40 rounded-xl text-xl font-semibold"
            style={
              !disableButton
                ? { backgroundColor: "#FFC300" }
                : { backgroundColor: "#FFC40096" }
            }
          >
            Add
          </button>
        </div>
      </AddComponent>

  );
}
