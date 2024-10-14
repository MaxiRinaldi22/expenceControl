import { useState } from "react";
import { DateNavProps } from "../services/types";
import { BackArrowIcon, Coin, Plus } from "./icons";
import useBalanceContext from "../hooks/useBalanceContext";

export function GraphicBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-80 w-full flex-col justify-between rounded-xl bg-[#000814] px-3 py-3">
      {children}
    </div>
  );
}

export function ServiceCard({
  children,
  id,
  color,
}: {
  children: React.ReactNode;
  id: number;
  color?: string;
}) {
  return (
    <div
      key={id}
      style={{ borderColor: color }}
      className="flex h-12 w-full items-center justify-between rounded-xl border-l-2 bg-component-color px-5 py-3 text-sm font-semibold text-white"
    >
      {children}
    </div>
  );
}

export function TimeNavbar({ setDateNav, dateNav }: DateNavProps) {
  const styles = {
    disable: {
      borderBottom: "none",
    },
    active: {
      paddingBottom: "1px",
      borderBottom: "2px solid white",
    },
  };

  return (
    <nav>
      <ul className="flex justify-between px-12 text-sm font-semibold text-white">
        <li style={dateNav === "day" ? styles.active : styles.disable}>
          <button onClick={() => setDateNav("day")}>Day</button>
        </li>
        <li style={dateNav === "week" ? styles.active : styles.disable}>
          <button onClick={() => setDateNav("week")}>Week</button>
        </li>
        <li style={dateNav === "month" ? styles.active : styles.disable}>
          <button onClick={() => setDateNav("month")}>Month</button>
        </li>
        <li style={dateNav === "year" ? styles.active : styles.disable}>
          <button onClick={() => setDateNav("year")}>Year</button>
        </li>
      </ul>
    </nav>
  );
}

export function OpenButton({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex h-full w-full items-end justify-end">
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-[100%] bg-[#FFC300]"
      >
        <Plus />
      </button>
    </div>
  );
}

export function AddComponent({ children }: { children: React.ReactNode }) {
  return (
    <section className="absolute  flex h-[92vh] w-full items-center justify-center bg-back-main-color p-6">
      <div className="flex h-[510px] w-full flex-col items-center justify-between gap-5 rounded-xl bg-component-color px-2 pt-2">
        {children}
      </div>
    </section>
  );
}

export function BackArrow({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="h-4 w-full">
      <button onClick={() => setOpen(false)}>
        <BackArrowIcon />
      </button>
    </div>
  );
}

export function AddInput({
  amount,
  setAmount,
}: {
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
}) {
  return (
    <div className="w-44">
      <input
        className="w-full border-b-2 bg-component-color pb-1 text-center text-3xl font-[400] text-white focus:outline-none"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.valueAsNumber)}
        onFocus={() => setAmount("")}
      />
    </div>
  );
}

export function SelectDate({
  setDate,
}: {
  setDate: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [customDate, setCustomDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    Array(3).fill(false),
  );

  const dateConst = new Date();
  const day: { text: string; value: string } = {
    text: `${dateConst.getDate()}/${dateConst.getMonth() + 1}`,
    value: `${dateConst.getFullYear()}-${dateConst.getMonth() + 1}-${dateConst.getDate()}`,
  };

  const yesterday: { text: string; value: string } = {
    text: `${dateConst.getDate() - 1}/${dateConst.getMonth() + 1}`,
    value: `${dateConst.getFullYear()}-${dateConst.getMonth() + 1}-${dateConst.getDate() - 1}`,
  };

  const last: { text: string; value: string } = {
    text: `${dateConst.getDate() - 2}/${dateConst.getMonth() + 1}`,
    value: `${dateConst.getFullYear()}-${dateConst.getMonth() + 1}-${dateConst.getDate() - 2}`,
  };

  const dateArray = [day, yesterday, last];

  const handleClickDate = ({ value, id }: { value: string; id: number }) => {
    setDate(value);

    setSelectedCategory(Array(7).fill(false));
    setSelectedCategory((prev) => {
      const newSelected = [...prev];
      newSelected[id] = !newSelected[id];
      return newSelected;
    });
  };

  const handleInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDate(e.target.value);
    setDate(e.target.value);
  };

  const customDay = customDate.split("-")[2];
  const customMonth = customDate.split("-")[1];
  const customYear = customDate.split("-")[0];

  return (
    <div className="flex w-full justify-between px-1">
      <div className="flex gap-1">
        {customDate !== "" && (
          <p className="flex items-center rounded-md bg-[#001D3D] px-2 text-lg font-[500] text-white">
            {customDay}/{customMonth}/{customYear}
          </p>
        )}
        {dateArray.map((date, id) => (
          <button
            onClick={() => handleClickDate({ value: date.value, id })}
            key={id}
            className="rounded-md px-2 text-lg font-[500] text-white transition-transform duration-300 will-change-transform hover:scale-110"
            style={
              selectedCategory[id] && customDate === ""
                ? { background: "#001D3D" }
                : {}
            }
          >
            {customDate === "" && date.text}
          </button>
        ))}
      </div>
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center"
      >
        <input
          value={customDate}
          onChange={handleInputDate}
          type="date"
          className="w-5 cursor-pointer border-none bg-transparent text-lg font-[500] outline-none invert"
        />
      </form>
    </div>
  );
}


export function HeaderTotalValue() {
  const { totalValue } = useBalanceContext();

  let showResult;
  if (totalValue >= 1000000) {
    showResult = (totalValue / 1000000).toFixed(1) + "M";
  } else if (totalValue >= 100000) {
    showResult = (totalValue / 1000).toFixed(1) + "K";
  } else {
    showResult = totalValue.toString();
  }

  
  return (
    <section className="flex h-[8vh] flex-col items-center justify-center rounded-bl-full rounded-br-full bg-[#003566] px-20">
    <div className="flex items-center gap-2">
      <Coin />
      <p className="text-sm font-semibold text-white">Total:</p> 
    </div>
    <h1 className="text-[20px] font-bold text-white">${showResult}</h1>
  </section>
  )
}