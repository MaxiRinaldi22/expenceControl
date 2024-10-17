import { createContext, useState } from "react";
import { ExpensesContextType, StructureType } from "../services/types";

const ExpensesContext = createContext<ExpensesContextType | null>(null);

function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<StructureType[]>(
    localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses") as string)
      : [],
  );

  localStorage.setItem("expenses", JSON.stringify(expenses));

  const totalExpensesValue = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0,
  );

  return (
    <ExpensesContext.Provider
      value={{ expenses, setExpenses, totalExpensesValue }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export { ExpensesContext, ExpensesContextProvider };
