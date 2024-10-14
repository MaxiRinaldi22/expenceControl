import { createContext, useState } from "react";
import { BalanceContextType, StructureType } from "../services/types";
import useExpensesContext from "../hooks/useExpensesContext";
import useInconmeContext from "../hooks/useInconmeContext";

const BalanceContext = createContext<BalanceContextType | null>(null);

function BalanceContextProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<StructureType[]>(
    localStorage.getItem("balance")
      ? JSON.parse(localStorage.getItem("balance") as string)
      : [],
  );

  const { inconmes } = useInconmeContext();
  const { expenses } = useExpensesContext();

  const totalExpensesValue = expenses.reduce(
    (acc, curr) => acc + curr.amount!,
    0,
  );
  const totalInconmeValue = inconmes.reduce(
    (acc, curr) => acc + curr.amount!,
    0,
  );
 
  const totalValue = totalInconmeValue - totalExpensesValue;

  localStorage.setItem("balance", JSON.stringify(balance));

  return (
    <BalanceContext.Provider value={{ balance, setBalance, totalValue }}>
      {children}
    </BalanceContext.Provider>
  );
}

export { BalanceContext, BalanceContextProvider };
