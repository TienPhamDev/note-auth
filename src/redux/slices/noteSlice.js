// Note slice for Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../api/axiosClient";

export const addNote = createAsyncThunk("notes/addNote", async (note) => {
  // Send only the essential data that the user provides
  const res = await axiosClient.post("/api/notes", {
    ...note,
  });
  return res.data;
});
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const res = await axiosClient.get("/api/notes");
  return res.data;
});
const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle async actions here if needed
    builder
      // Add Note reducers
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Notes reducers
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default noteSlice.reducer;
