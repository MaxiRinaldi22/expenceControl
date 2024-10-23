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
  localStorage.setItem("balance", JSON.stringify(balance));

  const { totalInconmeValue } = useInconmeContext();
  const { totalExpensesValue } = useExpensesContext();

  const totalValue = totalInconmeValue - totalExpensesValue;

  return (
    <BalanceContext.Provider value={{ balance, setBalance, totalValue }}>
      {children}
    </BalanceContext.Provider>
  );
}

export { BalanceContext, BalanceContextProvider };
