// NoteList component
import React from "react";
import { fetchNotes } from "../../redux/slices/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import NoteItem from "../NoteItem/NoteItem";

const NoteList = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);

  React.useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <h1>Note List</h1>
        <p>Loading notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Note List</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
        <button onClick={() => dispatch(fetchNotes())}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Note List</h1>
      {notes && notes.length > 0 ? (
        notes.map((note) => <NoteItem key={note.id} note={note} />)
      ) : (
        <p>No notes found. Add your first note!</p>
      )}
    </div>
  );
};

export default NoteList;
