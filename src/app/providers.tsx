"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useAppSelector } from "@/store/hooks";

function ThemeSync({ children }: { children: React.ReactNode }) {
  const themeMode = useAppSelector((s) => s.ui.themeMode);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark");
  }, [themeMode]);
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeSync>{children}</ThemeSync>
    </Provider>
  );
}
