import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

export interface UiState {
  sidebarOpen: boolean;
  activeView: string | null;
  globalLoading: boolean;
  themeMode: ThemeMode;
}

const initialState: UiState = {
  sidebarOpen: true,
  activeView: null,
  globalLoading: false,
  themeMode: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveView(state, action: PayloadAction<string | null>) {
      state.activeView = action.payload;
    },
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload;
    },
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
    toggleTheme(state) {
      state.themeMode = state.themeMode === "dark" ? "light" : "dark";
    },
  },
});

export const {
  setSidebarOpen,
  toggleSidebar,
  setActiveView,
  setGlobalLoading,
  setThemeMode,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
