import { useState } from "react";
import {
  GraphicBox,
  HeaderTotalValue,
  List,
  OpenButton,
  ServiceCard,
  TimeNavbar,
} from "../Components";
import { AddExpenses } from "./AddExpenses";
import ExpensesGraphinc from "./ExpensesGraphic";
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
import { StructureType } from "../../services/types";
import { useDateFilter } from "../../hooks/useDateFilter";

function Expenses() {
  const { expenses } = useExpensesContext();
  const [open, setOpen] = useState(false);
  const [dateNav, setDateNav] = useState<"day" | "week" | "month" | "year">(
    "week",
  );

  const filteredExpenses: StructureType[] = useDateFilter({
    items: expenses,
    dateNav,
  });

  return (
    <section className="relative flex h-[92vh] flex-col items-center gap-3 bg-[#001D3D] p-3 pt-0 text-3xl">
      <HeaderTotalValue />
      <GraphicBox>
        <TimeNavbar setDateNav={setDateNav} dateNav={dateNav} />
        <div className="flex h-full">
          <div className="h-full w-full">{/* EMPTY */}</div>
          <div className="flex h-full w-56 items-center justify-center text-white">
            <ExpensesGraphinc filteredExpenses={filteredExpenses} />
          </div>
          <OpenButton setOpen={setOpen} />
        </div>
      </GraphicBox>
      <List>
        {filteredExpenses.map((exp: StructureType, id: number) => (
          <ServiceCard key={id} id={id} color={exp.backgroundColor}>
            <div className="flex items-center justify-center gap-2">
              <div
                style={{ background: exp.backgroundColor }}
                className="rounded-full p-1"
              >
                {exp.category === "Health" && <Helath width={22} />}
                {exp.category === "Leisure" && <Leisure width={22} />}
                {exp.category === "Home" && <Home width={22} />}
                {exp.category === "Cafe" && <Cafe width={22} />}
                {exp.category === "Education" && <Education width={22} />}
                {exp.category === "Gifts" && <Gift width={22} />}
                {exp.category === "Groceries" && <Groceries width={22} />}
              </div>
              <p className="text-base font-[400]">{exp.category}</p>
            </div>
            <p className="text-base font-[500]">${exp.amount}</p>
          </ServiceCard>
        ))}
      </List>
      {open && <AddExpenses setOpen={setOpen} />}
    </section>
  );
}

export default Expenses;
