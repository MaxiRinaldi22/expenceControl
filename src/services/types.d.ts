export type StructureType = {
  amount: number | string;
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
  balance: StructureType[];
  setBalance: React.Dispatch<React.SetStateAction<StructureType[]>>;
  totalValue: number;
};

export type ExpensesContextType = {
  expenses: StructureType[];
  setExpenses: React.Dispatch<React.SetStateAction<StructureType[]>>;
};

type dates = "day" | "week" | "month" | "year";

export type DateNavProps = {
  dateNav: dates;
  setDateNav: React.Dispatch<React.SetStateAction<dates>>;
};

export type DateFilterProps = {
  dateNav: dates;
  items: StructureType[];
};
