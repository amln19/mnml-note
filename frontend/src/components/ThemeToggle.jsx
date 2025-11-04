import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mode, setMode] = useState(() => {
    if (localStorage.getItem("mode")) {
      return localStorage.getItem("mode");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  // Map logical theme → DaisyUI theme
  const themeMap = {
    light: "custom-light",
    dark: "custom-dark",
  };

  useEffect(() => {
    const daisyTheme = themeMap[mode] || "custom-light";
    document.documentElement.setAttribute("data-theme", daisyTheme);
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
    >
      {mode === "dark" ? (
        <Sun className="size-5 text-base-content" />
      ) : (
        <Moon className="size-5 text-base-content" />
      )}
    </button>
  );
}
