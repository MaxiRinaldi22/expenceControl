import { DateNavProps, dates } from "../../services/types";

type DataType = {
  text: dates;
};

export function TimeNavbar({ setDateNav, dateNav }: DateNavProps) {
  const styles = {
    disable: {
      backgroundColor: "#1f2d3d",
    },
    active: {
     backgroundColor: "#3C5A73",
    
    },
  };

  const data: DataType[] = [
    { text: "day" },
    { text: "week" },
    { text: "month" },
    { text: "year" },
  ];

  return (
    <nav>
      <ul className="flex items-center justify-between gap-5 text-sm font-semibold text-white">
        {data.map((item) => (
          <li
            key={item.text}
            style={dateNav === item.text ? styles.active : styles.disable}
            className="md:rounden-md flex w-full items-center justify-center rounded-md py-3 p-2"
          >
            <button onClick={() => setDateNav(item.text)}>{(item.text).charAt(0).toUpperCase() + (item.text).slice(1)}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
