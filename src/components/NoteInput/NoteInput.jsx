// NoteInput component
import React from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../../redux/slices/noteSlice"; // Assuming you have a

const NoteInput = () => {
  const [noteTitle, setNoteTitle] = React.useState("");
  const [noteContent, setNoteContent] = React.useState("");

  const dispatch = useDispatch();
  const handleAddNotes = () => {
    // Logic to add note
    if (noteTitle.trim() && noteContent.trim()) {
      dispatch(
        addNote({
          title: noteTitle,
          content: noteContent,
        })
      );
      setNoteTitle(""); // Clear input after adding
      setNoteContent(""); // Clear input after adding
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <br />
      <textarea
        type="text"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <div>
        <button onClick={handleAddNotes}>Add note</button>
      </div>
    </div>
  );
};

export default NoteInput;
