import { DateFilterProps, StructureType } from "../services/types";

export function useDateFilter({
  items,
  dateNav,
}: DateFilterProps): StructureType[] {
  const dateConst = new Date();
  let filteredItems = items

  if (dateNav === "day") {
    filteredItems = items.filter(
      (exp) =>
        exp.date ===
        `${dateConst.getFullYear()}-${dateConst.getMonth() + 1}-${dateConst.getDate()}`,
    );
  } else if (dateNav === "week") {
    const currentDate = new Date(dateConst);
    const dayOfWeek = currentDate.getDay();

    const firstDayOfWeek = new Date(
      currentDate.setDate(
        currentDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek),
      ),
    ); // First day of the week
    const lastDayOfWeek = new Date(firstDayOfWeek);

    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Last day of the week

    filteredItems = items.filter((exp) => {
      const expDate = new Date(exp.date);

      return expDate >= firstDayOfWeek && expDate <= lastDayOfWeek;
    });
  } else if (dateNav === "month") {
    const firstDayOfMonth = new Date(
      dateConst.getFullYear(),
      dateConst.getMonth(),
      1,
    ); // First day of the month
    const lastDayOfMonth = new Date(
      dateConst.getFullYear(),
      dateConst.getMonth() + 1,
      0,
    ); // Last dat of the month

    filteredItems = items.filter((exp) => {
      const expDate = new Date(exp.date);
      return expDate >= firstDayOfMonth && expDate <= lastDayOfMonth;
    });
  } else if (dateNav === "year") {
    const firstDayOfYear = new Date(dateConst.getFullYear(), 0, 1); // First day of the year
    const lastDayOfYear = new Date(dateConst.getFullYear(), 11, 31); // Last dat of the year

    filteredItems = items.filter((exp) => {
      const expDate = new Date(exp.date);
      return expDate >= firstDayOfYear && expDate <= lastDayOfYear;
    });
  }

  return filteredItems;
}
