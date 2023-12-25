import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    selectedDates: [],
  },
  reducers: {
    selectDates: (state, action) => {
      state.selectedDates = action.payload;
    },
    clearDates: (state) => {
      state.selectedDates = [];
    },
    addSlotsToSchedule: (state, action) => {
      const { date, slots } = action.payload;
      const existingDateIndex = state.selectedDates.findIndex(
        (selectedDate) => selectedDate.date === date
      );

      if (existingDateIndex !== -1) {
        state.selectedDates[existingDateIndex].slots = slots;
      }
    },
  },
});

export const { selectDates, clearDates, addSlotsToSchedule } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
