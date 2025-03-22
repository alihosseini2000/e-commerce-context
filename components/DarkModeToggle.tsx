'use client';

import { useEffect, useState } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2"
    >
      {isDarkMode ? <BsSun /> : <BsMoon />}
    </button>
  );
};

export default DarkModeToggle;
