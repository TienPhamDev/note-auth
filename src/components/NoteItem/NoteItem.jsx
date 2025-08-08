import React from "react";
import { useDispatch } from "react-redux";
import { deleteNote } from "../../redux/slices/noteSlice"; // Assuming you have a
import { editNote } from "../../redux/slices/noteSlice"; // Assuming you have a
const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(note.title);
  const [editedContent, setEditedContent] = React.useState(note.content);
  const { title, content } = note;
  const handleIsEdting = () => {
    setIsEditing(!isEditing);
  };
  const handleDelete = () => {
    // Logic to delete note
    console.log("Delete note:", note.id);
    dispatch(deleteNote(note.id));
  };
  const handleEdit = () => {
    // Logic to edit note
    dispatch(
      editNote({
        noteId: note.id,
        updatedData: { title: editedTitle, content: editedContent },
      })
    );
    setIsEditing(false);
  };
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleIsEdting}>Edit note</button>
      {isEditing && (
        <div>
          <label htmlFor="">Edit Title :</label>
          <input
            type="text"
            defaultValue={title}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <br />
          <label htmlFor="">Edit Content :</label>
          <textarea
            type="text"
            defaultValue={content}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div>
            <button onClick={handleEdit}>Save</button>
          </div>
        </div>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NoteItem;
