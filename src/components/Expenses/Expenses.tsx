import { useState } from "react";
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
import { dates, StructureType } from "../../services/types";
import { useDateFilter } from "../../hooks/useDateFilter";
import { GraphicBox } from "../ui/GraphicBox";
import { ServiceCard } from "../ui/ServiceCard";
import { TimeNavbar } from "../ui/TimeNavBar";
import { OpenButton } from "../ui/OpenButton";
import { List } from "../ui/List";
import { HeaderTotalsValues } from "../ui/HeaderTotalsValues";
import { TimeGraphic } from "../ui/TimeGraphic";
import { ListEskeleton } from "../ui/ListEskeleton";

function Expenses() {
  const { expenses } = useExpensesContext();
  const [open, setOpen] = useState(false);
  const [dateNav, setDateNav] = useState<dates>("week");

  const filteredExpenses: StructureType[] = useDateFilter({
    items: expenses,
    dateNav,
  });

  return (
    <section className="relative flex flex-col items-center gap-3 bg-back-main-color p-3 pt-0 text-3xl md:max-h-screen md:w-[calc(100%-144px)] md:flex-row">
      <div className="flex h-full w-full flex-col gap-5 p-4 md:w-[50%] md:p-10 md:pr-5">
        <HeaderTotalsValues />

        <GraphicBox>
          <div className="block md:hidden">
            <TimeNavbar setDateNav={setDateNav} dateNav={dateNav} />
          </div>

          <div className="flex h-full w-full items-center justify-center text-white">
            <ExpensesGraphinc filteredExpenses={filteredExpenses} />
          </div>
        </GraphicBox>

        <section className="flex h-80 rounded-xl bg-component-color md:h-[41.75%] md:min-h-[41.75%]">
          <TimeGraphic filteredItems={filteredExpenses} />
        </section>
      </div>

      <div className="flex w-full flex-col gap-5 px-4 md:h-full md:w-[50%] md:justify-start md:p-10 md:pl-5">
        <div className="hidden md:block">
          <TimeNavbar setDateNav={setDateNav} dateNav={dateNav} />
        </div>

        {filteredExpenses.length > 0 ? (
          <List>
            {filteredExpenses.map((exp: StructureType, id: number) => (
              <ServiceCard key={id} id={id} color={exp.backgroundColor}>
                <div className="flex items-center justify-center gap-3">
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
        ) : (
          <ListEskeleton />
        )}
        <OpenButton setOpen={setOpen} text="EXPENSE" />
      </div>
      {open && <AddExpenses setOpen={setOpen} />}
    </section>
  );
}

export default Expenses;
