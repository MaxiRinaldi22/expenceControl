import { useContext } from "react";
import { ExpensesContext } from "../context/ExpensesContextProvider";

export default function useExpensesContext() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error(
      "useExpensesContext must be used within an ExpensesContextProvider",
    );
  }
  return context;
}
