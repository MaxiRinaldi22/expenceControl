export type StructureType = {
  amount: number | undefined;
  category: string;
  backgroundColor: string;
  date: string;
  type: "expenses" | "inconme";
};

export type InconmeContextType = {
  inconmes: StructureType[];
  setInconmes: React.Dispatch<React.SetStateAction<StructureType[]>>;
};

export type BalanceContextType = {
  balance: StructureType[],
  setBalance:  React.Dispatch<React.SetStateAction<StructureType[]>>
  totalValue: number
}

export type ExpensesContextType = {
  expenses: StructureType[];
  setExpenses: React.Dispatch<React.SetStateAction<StructureType[]>>;
};

export type DateNavProps = {
  dateNav: "day" | "week" | "month" | "year";
  setDateNav: React.Dispatch<React.SetStateAction<"day" | "week" | "month" | "year">>;
}

export type DateFilterProps = {
  dateNav: "day" | "week" | "month" | "year";
  items: StructureType[];
}