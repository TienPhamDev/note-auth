// Notes screen component
import React from "react";
import NoteInput from "../../components/NoteInput/NoteInput";
import NoteList from "../../components/NoteList/NoteList";
// import LogoutButton from "../../components/LogoutButton/LogoutButton";

const Notes = () => {
  return (
    <div>
      <h1>Notes</h1>
      <NoteInput />
      <NoteList />
      {/* <LogoutButton /> */}
    </div>
  );
};

export default Notes;
