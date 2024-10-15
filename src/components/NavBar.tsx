import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="absolute w-full bg-back-main-color md:flex md:justify-center ">
      <nav className="flex h-[8vh] items-center justify-center rounded-tl-full rounded-tr-full bg-[#003566] md:w-[800px]">
        <ul className="flex gap-10">
          <li
            className="text-sm font-semibold text-white"
            style={isActive("/expenses") ? styles.active : styles.disable}
          >
            <Link to="/expenses">EXPRESES</Link>
          </li>
          <li
            className="text-sm font-semibold text-white"
            style={isActive("/balance") ? styles.active : styles.disable}
          >
            <Link to="/balance">BALANCE</Link>
          </li>
          <li
            className="text-sm font-semibold text-white"
            style={isActive("/income") ? styles.active : styles.disable}
          >
            <Link to="/income">ICONME</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  disable: {
    borderBottom: "none",
  },
  active: {
    paddingBottom: "1px",
    borderBottom: "2px solid white", // Línea debajo del enlace activo
  },
};

export default NavBar;
