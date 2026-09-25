import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",

  initialState: {
    showGptSearch: false,
    gptSuggestedMovies: null,
    isLoading: false,
  },

  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },

    addGptSuggestedMovies: (state, action) => {
      state.gptSuggestedMovies = action.payload;
    },

    setGptLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleGptSearchView, addGptSuggestedMovies, setGptLoading } =
  gptSlice.actions;

export default gptSlice.reducer;
