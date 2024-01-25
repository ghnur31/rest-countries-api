import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DarkMode = () => {
  const initialDarkMode = localStorage.getItem("darkMode") === "true" || false;
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <input
        className="hidden"
        type="checkbox"
        id="darkmode-toggle"
        onChange={handleDarkModeToggle}
        checked={darkMode}
      />
      <label className="" htmlFor="darkmode-toggle">
        <div className="text-md sm:text-lg font-medium hover:cursor-pointer">
          <p>
            <FontAwesomeIcon icon={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"} />{" "}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </p>
        </div>
      </label>
    </div>
  );
};

export default DarkMode;

