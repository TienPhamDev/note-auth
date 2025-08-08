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
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId) => {
    await axiosClient.delete(`/api/notes/${noteId}`);
  }
);
export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ noteId, updatedData }, { getState }) => {
    const note = getState().notes.notes.find((note) => note.id === noteId);
    if (!note) return;

    const res = await axiosClient.patch(`/api/notes/${noteId}`, {
      ...updatedData,
    });
    console.log(res.data);
    return res.data;
  }
);
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
      })
      // Delete Note reducers
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.meta.arg);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Edit Note reducers
      .addCase(editNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.loading = false;
        const noteId = action.payload.id;
        const index = state.notes.findIndex((note) => note.id === noteId);
        // Update the note in the state
        if (index !== -1) {
          state.notes[index] = action.payload;
        }

        state.error = null;
      })
      .addCase(editNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default noteSlice.reducer;
