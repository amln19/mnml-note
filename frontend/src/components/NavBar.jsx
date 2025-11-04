import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="border-b border-base-content/10">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold font-sans tracking-tight">
            MnmlNote
          </Link>
          <div className="flex items-center gap-8">
            <Link to={"/create"} className="btn">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
