import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <header className="w-full py-24 flex flex-col items-center gap-6 bg-cream-light">
      <nav className="flex gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-heading font-bold text-lg hover:underline ${isActive ? "underline" : ""}`
          }
        >
          MØNSTER
        </NavLink>
        <NavLink
          to="/new"
          className={({ isActive }) =>
            `font-heading font-bold text-lg hover:underline ${isActive ? "underline" : ""}`
          }
        >
          LAG NYTT MØNSTER
        </NavLink>
      </nav>
    </header>
  );
}
