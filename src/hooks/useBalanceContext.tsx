import { useContext } from "react";
import { BalanceContext } from "../context/BalanceContextProvider";

export default function useBalanceContext() {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error(
      "useBalanceContext must be used within an BalanceContextProvider",
    );
  }
  return context;
}

