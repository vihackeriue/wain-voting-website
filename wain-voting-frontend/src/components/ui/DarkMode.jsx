import React, { useEffect, useState } from "react";
import PrimaryButton from "./button/PrimaryButton";

function DarkMode() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  return (
    <PrimaryButton onClick={() => setTheme(!theme)}>
      {theme ? "Light Mode" : "Dark Mode"}
    </PrimaryButton>
  );
}

export default DarkMode;
