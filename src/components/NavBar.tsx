import { Link, useLocation } from "react-router-dom";
import { BalanceIcon, ExpresesIcon, IncomeIcon } from "./icons";
import { useEffect, useState } from "react";

function NavBar() {
  const [isScroll, setIsScroll] = useState(false);

  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScroll(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const data = [
    {
      text: "EXPENSES",
      icon: <ExpresesIcon />,
      path: "/expenses",
    },
    {
      text: "BALANCE",
      icon: <BalanceIcon />,
      path: "/balance",
    },
    {
      text: "INCOME",
      icon: <IncomeIcon />,
      path: "/income",
    },
  ];

  return (
    <div
      className={`w-full bg-back-main-color md:flex md:h-[100vh] md:w-36 md:justify-center ${isScroll ? "fixed top-0 z-10 bg-transparent" : "bg-back-main-color"}`}
    >
      <nav className="flex h-[8vh] items-center justify-center rounded-bl-full rounded-br-full bg-[#3C5A73] md:h-full md:w-full md:rounded-none md:rounded-br-full md:rounded-tr-full">
        <ul className="flex gap-4 md:flex-col md:gap-10">
          {data.map((item) => (
            <li
              key={item.text}
              className="flex items-center gap-2 text-sm font-semibold text-white md:text-base"
              style={
                isActive(item.path) ||
                (item.path === "/balance" && isActive("/"))
                  ? styles.active
                  : styles.disable
              }
            >
              {item.icon}
              <Link to={item.path}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  disable: {
    borderBottom: "2px solid transparent",
    paddingBottom: "1px",
  },
  active: {
    paddingBottom: "1px",
    borderBottom: "2px solid white",
  },
};

export default NavBar;
