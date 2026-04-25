import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PhaseFilter = "all" | "phase1" | "phase2" | "phase2plus";

export interface FiltersState {
  agency: string | null;
  phase: PhaseFilter;
  year: number | null;
  capabilityCluster: string | null;
  searchQuery: string;
}

const initialState: FiltersState = {
  agency: null,
  phase: "all",
  year: null,
  capabilityCluster: null,
  searchQuery: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAgency(state, action: PayloadAction<string | null>) {
      state.agency = action.payload;
    },
    setPhase(state, action: PayloadAction<PhaseFilter>) {
      state.phase = action.payload;
    },
    setYear(state, action: PayloadAction<number | null>) {
      state.year = action.payload;
    },
    setCapabilityCluster(state, action: PayloadAction<string | null>) {
      state.capabilityCluster = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setAgency,
  setPhase,
  setYear,
  setCapabilityCluster,
  setSearchQuery,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
