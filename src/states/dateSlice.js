import { createSlice } from '@reduxjs/toolkit';

const date = new Date();
const initialState = {
  activeYear: { year: date.getFullYear() },
  activeMonth: { monthId: date.getMonth() + 1 },
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setYear: (state, action) => {
      state.activeYear = action.payload;
    },
    setMonth: (state, action) => {
      state.activeMonth = action.payload;
    },
    resetDate: (state) => {
      state.activeYear = { year: date.getFullYear() };
      state.activeMonth = { monthId: date.getMonth() + 1 };
    },
  },
});

export const { setYear, setMonth, resetDate } = dateSlice.actions;
export default dateSlice.reducer;
